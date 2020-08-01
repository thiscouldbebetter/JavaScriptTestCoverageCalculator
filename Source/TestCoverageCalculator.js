
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
		var codeLinesSinceLastStatement = [];

		for (var i = 0; i < codeAsLines.length; i++)
		{
			var codeLine = codeAsLines[i];

			var codeLineTrimmed = codeLine.trim();
			if (codeLineTrimmed == "")
			{
				codeLinesPlusCoverageCalls.push(codeLine);
			}
			else if (codeLine.startsWith("\t\t"))
			{
				// It's deeply indented enough to be in a function,
				// according to our somewhat arbitrary code standard.

				var lineCommentSymbol = "//";
				var indexOfLineCommentSymbol = codeLine.indexOf(lineCommentSymbol);
				if (indexOfLineCommentSymbol >= 0)
				{
					// todo - Make sure it's not in quotes.
					codeLineTrimmed = codeLineTrimmed.substr
					(
						0, indexOfLineCommentSymbol - lineCommentSymbol.length
					);
					codeLineTrimmed = codeLineTrimmed.trim();
				}

				if (codeLineTrimmed != "")
				{
					codeLinesSinceLastStatement.push(codeLine);

					if (codeLineTrimmed.endsWith(";") || codeLineTrimmed.endsWith("{"))
					{

						var iMinusLinesInStatement =
							i - codeLinesSinceLastStatement.length + 1;
						var coverageStatement =
							"lineNumbersCovered.set("
							+ iMinusLinesInStatement + ","
							+ iMinusLinesInStatement + ")";
						this.coverageCallCount++;
						codeLinesPlusCoverageCalls.push(coverageStatement);
						codeLinesPlusCoverageCalls.push(...codeLinesSinceLastStatement);
						codeLinesSinceLastStatement.length = 0;
					}
				}
			}
			else
			{
				codeLinesPlusCoverageCalls.push(codeLine);
			}

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
		var linesCoveredCount = this.lineNumbersCovered.size;
		var coverageAsPercentage = Math.floor(linesCoveredCount / this.coverageCallCount * 100);
		var returnValue =
			"Lines covered: "
			+ linesCoveredCount
			+ "/"
			+ this.coverageCallCount
			+ " = "
			+ coverageAsPercentage + "%";
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
