import React from 'react';

// wrapper around votable.js
// https://gitlab.com/cdsdevcorner/votable.js/-/tree/master/

// construct a json structure from an incoming votable in xml format
/*
 votable_as_json:
 resources:
 tables:
 data: Array(100)
 0: Array(3)
 0: "https://vo.astron.nl/getproduct/APERTIF_DR1/190807041_AP_B001/image_mf_02.fits"
 1: "m1403+5324"
 2: "190807041_AP_B001"
 fieldnames: (3) ["accref", "target", "task_id"]
 */

export const getVOTableAsJSON = (votable) => {
    console.log("ReactVOTAble.getVOTableAsJSON")
    const myCallback = () => {
        console.log("myCallBack")
    }

    const myErrCallback = () => {
        alert("error loading table")
    }

    var p = new window.VOTableParser();
    p.displayErrors(true)
    p.setCallbackFunctions(myCallback, myErrCallback)
    p.loadFile(votable.URL)

/*
    // alternative, I don't know which one is better... loadFile or loadBufferedFile
    p.loadBufferedFile(votable, true)
    nr_of_tables = p.getNbTablesInFile()
    nr_of_resources = p.getNbResourcesInFile()
*/

    // get the metadata
    let meta = p.getVOTableMetadata()

    var nbResources = p.getNbResourcesInFile();

    var nbTablesInResource = 0;
    var currentTableGroups = [];
    var currentTableFields = [];
    var currentTableData = [[]];

    let votable_as_json = {}
    let array_of_resources = []

    for(var i = 0; i < nbResources; i++) {

        let resource_as_json = {}
        p.selectResource(i);
        nbTablesInResource = p.getCurrentResourceNbTables();

        let array_of_tables = []

        for(var j = 0; j < nbTablesInResource; j++) {

            let table_as_json = {}

            p.selectTable(j);
            currentTableGroups = p.getCurrentTableGroups();
            currentTableFields = p.getCurrentTableFields();
            currentTableData = p.getCurrentTableData();

            // add the data to the json structure

            // extract fieldnames for this table as an array of strings
            let numberOfFields = currentTableFields.length
            let fieldNames = []
            for (var k = 0; k < numberOfFields; k++) {
                fieldNames.push(currentTableFields[k].name)
            }

            table_as_json['fieldnames'] = fieldNames
            table_as_json['data'] = currentTableData
            array_of_tables.push(table_as_json)
        }

        resource_as_json['tables'] = array_of_tables
        array_of_resources.push(resource_as_json)

    }
    votable_as_json['resources'] = array_of_resources

    p.cleanMemory();

    return votable_as_json
}