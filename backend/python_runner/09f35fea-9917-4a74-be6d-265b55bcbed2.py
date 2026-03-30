import math

def calculate(a, b, op):
    if op == "+":
        return a + b
    elif op == "-":
        return a - b
    elif op == "*":
        return a * b
    elif op == "/":
        return a / b if b != 0 else "Cannot divide by 0"
    elif op == "%":
        return a % b
    elif op == "^":
        return a ** b
    else:
        return "Invalid operator"

while True:
    print("\nOperations: +  -  *  /  %  ^  sqrt  exit")
    op = input("Enter operation: ")

    if op == "exit":
        break

    if op == "sqrt":
        num = float(input("Enter number: "))
        print("Result:", math.sqrt(num))
        continue

    a = float(input("Enter first number: "))
    b = float(input("Enter second number: "))

    print("Result:", calculate(a, b, op))