
class TestCoverageCalculator
{
	constructor(codeToFindCoverageFor, testCodeToRun)
	{
		this.codeToFindCoverageFor = codeToFindCoverageFor;
		this.testCodeToRun = testCodeToRun;

		this.coverageCallCount = 0;

		this.lineNumbersCovered = [];
	}

	calculateTestCoverage()
	{
		var newline = "\n";
		var codeAsLines = this.codeToFindCoverageFor.split(newline);
		this.coverageCallCount = 0;
		var codeLinesPlusCoverageCalls = [];

		for (var i = 0; i < codeAsLines.length; i++)
		{
			var codeLine = codeAsLines[i];
			var isLineInFunction = codeLine.startsWith("\t\t");
			if (isLineInFunction)
			{
				var codeLineTrimmed = codeLine.trim();
				if (codeLine.startsWith("{"))
				{
					// Skip.
				}
				else
				{
					var coverageStatement =
						"lineNumbersCovered.set(" + i + "," + i + ")";
					codeLinesPlusCoverageCalls.push(coverageStatement);
					this.coverageCallCount++;
				}
			}

			codeLinesPlusCoverageCalls.push(codeLine);
		}

		var codeWithCoverageCalls = codeLinesPlusCoverageCalls.join(newline);
		var codeToEval =
			"var lineNumbersCovered = new Map();"
			+ newline
			+ codeWithCoverageCalls
			+ newline
			+ this.testCodeToRun
			+ newline
			+ "var returnLineNumbersCoveredAsMap = () => lineNumbersCovered;"
			+ newline
			+ "returnLineNumbersCoveredAsMap();"

		this.lineNumbersCovered = eval(codeToEval);
	}

	coverageToStringSummary()
	{
		var returnValue =
			"Lines covered: "
			+ this.lineNumbersCovered.size
			+ "/"
			+ this.coverageCallCount;
		return returnValue;
	}

	coverageToStringByLine()
	{
		var newline = "\n";
		var codeAsLines = this.codeToFindCoverageFor.split(newline);
		codeAsLines = codeAsLines.map
		(
			(codeLine, i) => ("" + i) + " " + codeLine
		);
		codeAsLines = codeAsLines.map
		(
			(codeLine, i) =>
			{
				if (this.lineNumbersCovered.has(i))
				{
					codeLine = "<mark>" + codeLine + "</mark>";
				}
				return codeLine;
			}
		);
		var codeFormatted = codeAsLines.join("<br/>");
		codeFormatted = codeFormatted.split("\t").join("&nbsp;&nbsp;&nbsp;&nbsp;");
		return codeFormatted;
	}
}