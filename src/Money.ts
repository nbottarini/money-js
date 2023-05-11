import Big from 'big.js'

export class Money {
    private readonly _amount: Big

    private constructor(amount: Big) {
        this._amount = amount
    }

    get amount(): Big {
        return this._amount
    }

    plus(other: Money): Money {
        return new Money(this.amount.plus(other.amount))
    }

    minus(other: Money): Money {
        return new Money(this.amount.minus(other.amount))
    }

    times(multiplier: Big | number): Money {
        return new Money(this.amount.times(multiplier))
    }

    div(divider: Big | number): Money {
        return new Money(this.amount.div(divider))
    }

    equals(other: Money): boolean {
        return this.amount.eq(other.amount)
    }

    lessThan(other: Money): boolean {
        return this.amount.lt(other.amount)
    }

    lessThanOrEquals(other: Money): boolean {
        return this.amount.lte(other.amount)
    }

    greaterThan(other: Money): boolean {
        return this.amount.gt(other.amount)
    }

    greaterThanOrEquals(other: Money): boolean {
        return this.amount.gte(other.amount)
    }

    abs(): Money {
        return this.isNegative() ? this.negated() : this
    }

    negated(): Money {
        return Money.of(-this.amount)
    }

    isPositive(): boolean {
        return this.amount.gte(new Big(0))
    }

    isNegative(): boolean {
        return this.amount.lt(new Big(0))
    }

    isZero(): boolean {
        return this.equals(Money.zero())
    }

    toString(): string {
        if (this.isNegative()) return '-$' + this._amount.abs().toString()
        return '$' + this.plainString()
    }

    plainString(): string {
        return this._amount.toString()
    }

    format(decimalPrecision: number = 2, groupSeparator: string = ',', decimalSeparator: string = '.', symbol: string = '$'): string {
        const valueWithDecimals = Number(this._amount.abs().toFixed(decimalPrecision))
            .toLocaleString('en', { useGrouping: false, maximumFractionDigits: decimalPrecision, minimumFractionDigits: 0 })
        const parts = valueWithDecimals.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
        const formatted = parts.join(decimalSeparator)
        if (!symbol) return formatted
        if (this.isNegative()) return '-' + symbol + formatted
        return symbol + formatted
    }

    static of(amount: Big | number | string): Money {
        let effectiveAmount = amount
        if (typeof amount === 'string') {
            if (amount.startsWith('-$')) {
                effectiveAmount = '-' + amount.removePrefix('-$')
            } else {
                effectiveAmount = amount.removePrefix('$')
            }
        }
        if (!(effectiveAmount instanceof Big)) {
            effectiveAmount = new Big(effectiveAmount)
        }
        return new Money(effectiveAmount)
    }

    static zero(): Money {
        return Money.of(0)
    }
}
