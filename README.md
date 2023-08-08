[![npm](https://img.shields.io/npm/v/@nbottarini/money.svg)](https://www.npmjs.com/package/@nbottarini/money)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI Status](https://github.com/nbottarini/money-js/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/nbottarini/money-js/actions)

# Money-Js
Money type with arbitrary-precision decimal arithmetic

## Installation

Npm:
```
$ npm install --save @nbottarini/money-js
```

Yarn:
```
$ yarn add @nbottarini/money-js
```

## Usage

### Initialization
```typescript
    const amount1 = Money.of('100.42')
    const amount2 = Money.of('$100.42')
    const amount3 = Money.of('-$100.42')
    const amount4 = Money.of(100)
    const amount5 = Money.of(100.55)
```

### Arithmetic Operations
```typescript
    const amount1 = Money.of('$10')
    const amount2 = Money.of(4)

    const result1 = amount1.plus(amount2) // $14
    const result2 = amount1.minus(amount2) // $6
    const result3 = amount1.times(amount2) // $40
    const result4 = amount1.div(amount2) // $2.5
    const result5 = Money.of('-$10').abs() // $10
    const result6 = Money.of('$10').negated() // -$10
```

### Comparison
```typescript
    const amount1 = Money.of('$10')
    const amount2 = Money.of(4)

    amount1.greaterThan(amount2)
    amount1.greaterThanOrEquals(amount2)
    amount1.lessThan(amount2)
    amount1.lessThanOrEquals(amount2)
```

### Conversion
```typescript
    Money.of('$10.55').toString() // $10.55 
    Money.of(4.12).toString() // $4.12
    Money.of('$10.55').plainString() // 10.55 
    Money.of(4.12).plainString() // 4.12

    Money.of('$15.12').toNumber() // 15.12
    Money.of('$156.667').toNumber() // 156.667
```

### Formatting
```typescript
    Money.of('$15000.231').format() // '$15,000.23'
    Money.of('-15000.231').format() // '-$15,000.23'
    Money.of('15000').format(2) // $15,000
    Money.of('$15000.23').format(2, '.', ',') // '$15.000,23'
    Money.of('$15000.236').format(2, '.', ',') // '$15.000,24'
    Money.of('$15000.231').format(2, ',', '.', 'USD ') // USD 15,000.23
```
