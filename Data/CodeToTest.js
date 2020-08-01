
class MathCalculator
{
	add(addend0, addend1)
	{
		var sum =
			addend0 // This is a test comment.
			+ addend1;

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
		// This is a test comment.
		var difference =
			minuend - subtrahend;
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

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	dotProduct(other)
	{
		var returnValue =
			this.x * other.x
			+ this.y * other.y
			+ this.z * other.z;
		return returnValue;
	}

	magnitude()
	{
		var returnValue = Math.sqrt
		(
			this.x * this.x
			+ this.y * this.y
			+ this.z * this.z
		);
		return returnValue;
	}

	normalize()
	{
		var magnitude = this.magnitude();
		var returnValue =
		(
			magnitude == 0
			? this
			: this.divide(magnitude)
		);
	}

}
