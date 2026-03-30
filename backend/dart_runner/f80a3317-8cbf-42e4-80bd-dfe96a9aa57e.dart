import 'dart:io';

double calculate(double a, double b, String op) {
  if (op == "+") return a + b;
  if (op == "-") return a - b;
  if (op == "*") return a * b;
  if (op == "/") return b != 0 ? a / b : double.nan;
  throw Exception("Invalid operator");
}

void main() {
  stdout.write("Enter first number: ");
  double a = double.parse(stdin.readLineSync()!);

  stdout.write("Enter second number: ");
  double b = double.parse(stdin.readLineSync()!);

  stdout.write("Enter operator (+, -, *, /): ");
  String op = stdin.readLineSync()!;

  try {
    double result = calculate(a, b, op);
    if (result.isNaN) {
      print("Cannot divide by 0");
    } else {
      print("Result: $result");
    }
  } catch (e) {
    print(e);
  }
}