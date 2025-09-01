function readFile() {
	var clientContext;
	var oWebsite;
	var fileUrl;

	clientContext = new SP.ClientContext.get_current();
	oWebsite = clientContext.get_web();
	clientContext.load(oWebsite);
	clientContext.executeQueryAsync(function () {
		fileUrl =

			"/Auditing%20Reports/auditing%20metadata.csv";
		$.ajax({
			url: fileUrl,
			type: "GET",
		})
			.done(Function.createDelegate(this, successHandler))
			.fail(Function.createDelegate(this, errorHandler));
	}, errorHandler);

    function successHandler(data) {
        let temp1 = data+data.split("\n")[2];
        let temp = csvToArray(data);
        console.log(temp1.split("\n"));
        updateFile(temp1)
	}

	function errorHandler() {
		console.log("Request failed: " + arguments[2]);
	}
}
function updateFile(content) {
    var clientContext;
    var oWebsite;
    var oList;
    var fileCreateInfo;
    var fileContent;

    clientContext = new SP.ClientContext.get_current();
    oWebsite = clientContext.get_web();
    oList = oWebsite.get_lists().getByTitle("Auditing Reports");

    fileCreateInfo = new SP.FileCreationInformation();
    fileCreateInfo.set_url("auditing%20metadata.csv");
    fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
    fileCreateInfo.set_overwrite(true);
    fileContent = content;

    for (var i = 0; i < fileContent.length; i++) {

        fileCreateInfo.get_content().append(fileContent.charCodeAt(i));
    }

    this.existingFile = oList.get_rootFolder().get_files().add(fileCreateInfo);

    clientContext.load(this.existingFile);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
    );

    function successHandler() {
        console.log("success");
    }

    function errorHandler() {
        console.log("Request failed: " + arguments[1].get_message());
    }
}
function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
}