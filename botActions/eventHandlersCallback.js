import { generateDateTimeSelector } from "../utils/calendar";
export const handleEventCreationCallback = async (ctx, eventCreationData) => {
    const userId = ctx.from.id;
    const currentEvent = eventCreationData[userId]; // Берем данные текущего пользователя
    if (currentEvent) {
        // Обработка выбора даты
        const dateMatch = ctx.callbackQuery.data.match(/^date:(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
            const selectedDate = dateMatch[1]; // Получаем выбранную дату
            currentEvent.event_time = selectedDate; // Сохраняем выбранную дату
            // Генерация выбора времени
            const timeKeyboard = generateDateTimeSelector(new Date().getFullYear(), new Date().getMonth(), "hour");
            await ctx.answerCallbackQuery();
            await ctx.editMessageText(`Вы выбрали дату: ${selectedDate}\nТеперь выберите время:`, {
                reply_markup: timeKeyboard,
            });
            return;
        }
        // Обработка выбора часа
        const hourMatch = ctx.callbackQuery.data.match(/^hour:(\d+)/);
        if (hourMatch) {
            const selectedHour = hourMatch[1]; // Получаем выбранный час
            const [date] = currentEvent.event_time.split(" ");
            const selectedDateTime = `${date} ${selectedHour.padStart(2, "0")}:00`;
            currentEvent.event_time = selectedDateTime; // Сохраняем выбранный час
            const minuteKeyboard = generateDateTimeSelector(new Date().getFullYear(), new Date().getMonth(), "minute", parseInt(selectedHour, 10));
            await ctx.answerCallbackQuery();
            await ctx.editMessageText(`Вы выбрали час: ${selectedHour}\nТеперь выберите минуты:`, { reply_markup: minuteKeyboard });
            return;
        }
        // Обработка выбора минут
        const minuteMatch = ctx.callbackQuery.data.match(/^minute:(\d{2})/);
        if (minuteMatch) {
            const selectedMinute = minuteMatch[1]; // Получаем выбранные минуты
            const [date, time] = currentEvent.event_time.split(" ");
            const [hour] = time.split(":");
            const selectedDateTime = `${date} ${hour.padStart(2, "0")}:${selectedMinute.padStart(2, "0")}`;
            currentEvent.event_time = selectedDateTime; // Сохраняем выбранные минуты
            // Переход к следующему этапу
            await ctx.answerCallbackQuery();
            await ctx.editMessageText("Теперь введите приглашение на ивент:");
            return;
        }
        // Обработка изменения месяца
        const monthMatch = ctx.callbackQuery.data.match(/^change_month:(\d{4})-(\d{2})/);
        if (monthMatch) {
            const [year, month] = monthMatch.slice(1).map(Number);
            const updatedCalendar = generateDateTimeSelector(year, (month + 12) % 12, "date");
            await ctx.answerCallbackQuery();
            await ctx.editMessageReplyMarkup({ reply_markup: updatedCalendar });
            return;
        }
    }
};
