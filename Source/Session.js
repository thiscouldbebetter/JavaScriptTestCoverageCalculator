
class Session
{
	constructor()
	{
		this.testCoverageCalculator = new TestCoverageCalculator();
	}

	static Instance = new Session();
}