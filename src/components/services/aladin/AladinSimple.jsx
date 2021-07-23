import React from 'react';

const Aladin = (props) => {

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        // create the catalog layer
        createLayers(aladin, props.data)

    }, [])

    // create the catalog layer
    const createLayers = (aladin, data) => {
        aladin.removeLayers()

        let my_catalog = window.A.catalog({
            name: 'Asteroids',
            shape : 'circle',
            color : 'yellow',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});

        // loop through all the objects and add them to the appropriate layer based on quality
        if (data) {
            data.forEach(function (object) {

                // draw a clickable icon for each object
                addToCatalog(my_catalog, object)
            })

            aladin.addCatalog(my_catalog);
        }

    }

    const addToCatalog = (my_catalog, object) => {

        let marker = [window.A.marker(
            object.ra,
            object.dec,

            {
                my_field_name: object.designation,
                my_name: object.designation,
                popupTitle: '<h5>'+object.designation+'</h5>',
                popupDesc: '<hr>visual magnitude: '+ Math.round(object.visual_magnitude*10)/10,
            },

        )]

        my_catalog.addSources(marker);
    }


    let title = "1000 asteroids in Aladin (click them!)"

    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin