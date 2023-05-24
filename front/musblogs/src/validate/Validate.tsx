import React from "react";

export const GetDayOfDate = (date: string | undefined) => {
    if (date) {
        const fullDayInfo = date.split('-')[2]
        return fullDayInfo.split('T')[0]
    }
    return "01"
}

export const GetMonthOfDate = (date: string | undefined) => {
    if (date) {
        const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
        const intValue = parseInt(date.split('-')[1])
        return months[intValue - 1]
    }
    return "январь"
}

export const GetYearOfDate = (date: string | undefined) => {
    if (date) 
        return date.split('-')[0]
    return "0000"
}

export const GetTimeOfDate = (date: string | undefined) => {
    if (date) {
        const fullDayInfo = date.split('-')[2]
        const fullTimeInfo = fullDayInfo.split('T')[1]
        return fullTimeInfo.split('.')[0]
    }
    return "0000"
}

export const ValidateNumber = (date: number | undefined, defaultValue: number = 0) => {
    if (date)
        return date
    return defaultValue
}

export const ValidateString = (date: string | undefined, defaultValue: string = "") => {
    if (date)
        return date
    return defaultValue
}