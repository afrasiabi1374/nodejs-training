//  فایل سیستم
import fs from 'fs'

export function isFile(path)
{
    try {
        return fs.lstatSync(path).isFile()
    } catch (e) {
        throw false
    }
}

export function isDirectory(path)
{
    try {
        return fs.lstatSync(path).isDirectory()
    } catch (e) {
        throw false
    }
}

export function fileExists(path)
{
    try {
        if (isFile(path)) {
            return fs.existsSync(path)
        } else {
            return false
        }
    } catch (e) {
        throw false
    }
}


export function unlink(path)
{
    try {
        if (isFile(path)) {
            fs.unlinkSync(path)
            return true
        } else {
            return false
        }
    } catch (e) {
        throw false
    }
}