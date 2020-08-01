
class FileHelper
{
	tarFileAsBinaryStringToJavaScriptText(fileContentsAsBinaryString)
	{
		var fileContentsAsBytes = fileContentsAsBinaryString.split("").map
		(
			x => x.charCodeAt(0)
		);
		var fileContentsAsTarFile = TarFile.fromBytes
		(
			"[fileName]", fileContentsAsBytes
		);
		var fileEntriesJs = fileContentsAsTarFile.entries.filter
		(
			x => x.header.fileName.endsWith(".js")
		);
		var fileEntriesJsAsByteArrays = fileEntriesJs.map(x => x.dataAsBytes);
		var fileEntriesJsAsStrings = fileEntriesJsAsByteArrays.map
		(
			x =>
			{
				return x.reduce( (a, b) => a += String.fromCharCode(b), "")
			}
		);
		var fileEntriesJsJoined = fileEntriesJsAsStrings.join("\n\n");

		return fileEntriesJsJoined
	}
}