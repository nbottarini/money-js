import Big from 'big.js'
import { Money } from '../src'

it('Money can be initialized from a string', () => {
    expect(Money.of('100.42')).toObjEquals(Money.of('$100.42'))
    expect(Money.of('$100.42')).toObjEquals(Money.of('$100.42'))
    expect(Money.of('-$100.42')).toObjEquals(Money.of('-$100.42'))
})

it('Money can be initialized from a number', () => {
    expect(Money.of(100)).toObjEquals(Money.of('$100'))
    expect(Money.of(155)).toObjEquals(Money.of('$155'))
    expect(Money.of(100.55)).toObjEquals(Money.of('$100.55'))
    expect(Money.of(0.77776)).toObjEquals(Money.of('$0.77776'))
})

it('Money can be initialized from a Big decimal', () => {
    expect(Money.of(new Big('100'))).toObjEquals(Money.of('$100'))
    expect(Money.of(new Big(100))).toObjEquals(Money.of('$100'))
    expect(Money.of(new Big(100.55))).toObjEquals(Money.of('$100.55'))
    expect(Money.of(new Big(0.77776))).toObjEquals(Money.of('$0.77776'))
})

it('plus', () => {
    expect(Money.of(100).plus(Money.of(200))).toObjEquals(Money.of(300))
    expect(Money.of(-20).plus(Money.of(10))).toObjEquals(Money.of(-10))
})

it('minus', () => {
    expect(Money.of(50).minus(Money.of(200))).toObjEquals(Money.of(-150))
    expect(Money.of(30).minus(Money.of(10))).toObjEquals(Money.of(20))
})

it('times', () => {
    expect(Money.of(50).times(2)).toObjEquals(Money.of(100))
    expect(Money.of(10).times(2.5)).toObjEquals(Money.of(25))
})

it('div', () => {
    expect(Money.of(50).div(2)).toObjEquals(Money.of(25))
    expect(Money.of(40).div(2.0)).toObjEquals(Money.of(20))
})

it('abs', () => {
    expect(Money.of(100).abs()).toObjEquals(Money.of(100))
    expect(Money.of(0).abs()).toObjEquals(Money.of(0))
    expect(Money.of(-100).abs()).toObjEquals(Money.of(100))
})

it('equality', () => {
    expect(Money.of(50.0)).toObjEquals(Money.of(50))
})

it('comparison', () => {
    expect(Money.of(50).greaterThan(Money.of(10.23))).toBeTrue()
    expect(Money.of(50).greaterThanOrEquals(Money.of(50))).toBeTrue()
    expect(Money.of(123.23).lessThan(Money.of(200))).toBeTrue()
    expect(Money.of(123.23).lessThanOrEquals(Money.of(123.23))).toBeTrue()
})

it('negated', () => {
    expect(Money.of(50).negated()).toObjEquals(Money.of(-50))
    expect(Money.of(-12.123).negated()).toObjEquals(Money.of(12.123))
})

it('toString returns a string representation of the money', () => {
    expect(Money.of(new Big('10.4')).toString()).toEqual('$10.4')
    expect(Money.of(-20).toString()).toEqual('-$20')
})

it('plainString returns a string representation of the money without $ symbol', () => {
    expect(Money.of(new Big('10.4')).plainString()).toEqual('10.4')
})

it('format returns a string representation of the money with group and decimal separators', () => {
    expect(Money.of('$15000.231').format()).toEqual('$15,000.23')
    expect(Money.of('-15000.231').format()).toEqual('-$15,000.23')
    expect(Money.of('15000').format(2)).toEqual('$15,000')
    expect(Money.of('$15000.23').format(2, '.', ',')).toEqual('$15.000,23')
    expect(Money.of('$15000.236').format(2, '.', ',')).toEqual('$15.000,24')
    expect(Money.of('$15000.236').format(3, '.', ',')).toEqual('$15.000,236')
    expect(Money.of('$15000000.256').format(1, '.', ',')).toEqual('$15.000.000,3')
})

it('format with custom symbol', () => {
    expect(Money.of('$15000.231').format(2, ',', '.', 'USD ')).toEqual('USD 15,000.23')
})
