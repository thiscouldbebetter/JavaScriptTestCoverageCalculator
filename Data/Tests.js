
function Test()
{
	// Demonstrate test coverage calculation.

	// The system under test is MathCalculator.
	var calculator = new MathCalculator();

	// Run some, but not all, methods in some, but not all, classes.

	var actual = calculator.add(1, 2);
	var expected = 3;
	if (actual != expected)
	{
		throw "Expected: " + expected + ", but got: " + actual;
	}

	// Call add again, to make sure lines aren't counted in coverage twice.
	var actual = calculator.add(1, 2);
	var expected = 3;
	if (actual != expected)
	{
		throw "Expected: " + expected + ", but got: " + actual;
	}

	var actual = calculator.subtract(3, 2);
	var expected = 1;
	if (actual != expected)
	{
		throw "Expected: " + expected + ", but got: " + actual;
	}

	// Don't call .divide() or .multiply(), or anything on the Coords class.
}

Test();
