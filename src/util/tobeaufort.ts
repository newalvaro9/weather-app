export default function toBeaufort(speed: number): number {

    var beaufortScale: number = 0
    switch (true) {
        case speed < 0.5:
            beaufortScale = 0
            break
        case speed >= 0.5 && speed <= 1.5:
            beaufortScale = 1
            break
        case speed >= 1.6 && speed <= 3.3:
            beaufortScale = 2
            break
        case speed >= 3.4 && speed <= 5.5:
            beaufortScale = 3
            break
        case speed >= 5.6 && speed <= 7.9:
            beaufortScale = 4
            break
        case speed >= 8 && speed <= 10.7:
            beaufortScale = 5
            break
        case speed >= 10.8 && speed <= 13.8:
            beaufortScale = 6
            break
        case speed >= 13.9 && speed <= 17.1:
            beaufortScale = 7
            break
        case speed >= 17.2 && speed <= 20.7:
            beaufortScale = 8
            break
        case speed >= 20.8 && speed <= 24.4:
            beaufortScale = 9
            break
        case speed >= 24.5 && speed <= 28.4:
            beaufortScale = 10
            break
        case speed >= 28.5 && speed <= 32.6:
            beaufortScale = 11
            break
        case speed >= 32.7:
            beaufortScale = 12
            break
    }
    return beaufortScale;
}