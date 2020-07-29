
class MathCalculator
{
	add(addend0, addend1)
	{
		var sum = addend0 + addend1;
		return sum;
	}

	divide(dividend, divisor)
	{
		var quotient = dividend / divisor;
		return quotient;
	}

	multiply(factor0, factor1)
	{
		var product = factor0 * factor1;
		return product;
	}

	subtract(minuend, subtrahend)
	{
		var difference = minuend - subtrahend;
		return difference;
	}
}

class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}
}