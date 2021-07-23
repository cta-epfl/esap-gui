import React, { useContext } from "react";
import {Card, Button, Table, Image } from 'react-bootstrap'
import { AladinAdvancedContext } from "../../../contexts/AladinAdvancedContext";

function getPlanet(planets, planet_name) {

    return planets.find((planet) => {
        if (planet.pl_name===planet_name) {
            return true;
        }
        return false;
    });
}

export default function DataItemCard(props) {
    const { selectedDataItem, setSelectedDataItem, fetchedData } = useContext(AladinAdvancedContext);


    let planet_name = selectedDataItem
    let selected_planet = getPlanet(fetchedData, planet_name)

    if (!selected_planet) {
        return <h5>Move the mouse over a planet</h5>
    }

    let trimmed_name = planet_name.replaceAll(' ','_')
    let url_to_exoplanet = "http://www.exoplanetkyoto.org/exohtml/"+trimmed_name+".html"
    //let url_to_exoplanet = "http://exoplanet.eu/catalog/"+planet_name

    let render_radius
    if (selected_planet.pl_rade) {
        render_radius=<tr>
            <td className="key">Radius (earths)</td>
            <td className="value">{parseInt(selected_planet.pl_rade*10)/10}</td>
        </tr>
    }

    let render_mass
    if (selected_planet.pl_bmasse) {
        render_mass=<tr>
            <td className="key">Mass (earths)</td>
            <td className="value">{parseInt(selected_planet.pl_bmasse*10)/10}</td>
        </tr>
    }

    return (
        <div className="App">
            <Card>
                <Card.Body>
                    <Table striped bordered hover size="sm">
                        <tbody>

                        <tr>
                            <td className="key"><h4>Planet</h4></td>
                            <td className="value"><h4><a href={url_to_exoplanet} target="_blank" rel="noopener noreferrer">{planet_name}</a></h4></td>
                        </tr>
                        {render_radius}
                        {render_mass}

                        <tr>
                            <td className="key"><h4>Star</h4></td>
                            <td className="value"><h4>{selected_planet.hostname}</h4></td>
                        </tr>

                        <tr>
                            <td className="key">Spectral Type</td>
                            <td className="value">{selected_planet.st_spectype}</td>
                        </tr>
                        <tr>
                            <td className="key">Nr of Stars</td>
                            <td className="value">{selected_planet.sy_snum}</td>
                        </tr>
                        <tr>
                            <td className="key">Nr of Planets</td>
                            <td className="value">{selected_planet.sy_pnum}</td>
                        </tr>
                        <tr>
                            <td className="key">Magnitude (V)</td>
                            <td className="value">{parseInt(selected_planet.sy_vmag*10)/10}</td>
                        </tr>
                        <tr>
                            <td className="key">Distance (parsec)</td>
                            <td className="value">{parseInt(selected_planet.sy_dist*10)/10}</td>
                        </tr>
                        <tr>
                            <td className="key"><h4>Discovery</h4></td>
                            <td className="value"><h4>{selected_planet.disc_year}</h4></td>
                        </tr>
                        <tr>
                            <td className="key">Facility</td>
                            <td className="value">{selected_planet.disc_facility}</td>
                        </tr>

                        </tbody>

                    </Table>

                </Card.Body>
            </Card>
        </div>
    );

}

