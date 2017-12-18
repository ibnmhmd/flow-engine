# Flow Engine
A simple rule processor written in react.

## Description

A flow engine is an application that executes a flow consisting of several linked rules, in this case against some incoming data (*a JSON string that can be parsed to a JavaScript object literal*).

Each rule should contain (at least)

- An ID (unique within the flow, required)
- A rule that will be run against the incoming JSON data. This is a function that takes a parameter and returns a boolean result. Each function should be called with the same incoming data (the JS object literal)
- An ID of the rule to execute if the function returns true (`true_id`)
- An ID of the rule to execute if the function returns false (`false_id`)

Pass an object (an example of an object and a rule is given below) to the created flow.

The execution will end when a `null` is provided for the `true_id` (and the function returns `true`) or when `null` is provided for the `false_id` (and the function returns `false`).

Additionally, the flow engine (with the provided rule-set) should not be circular.

## Quick Start

- Run `npm install`.
- Run `npm start` .

## Build

Run `npm run build`.


