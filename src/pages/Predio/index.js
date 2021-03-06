import React, { useEffect, useState } from "react"
import api from "../../services/api";
import { capitalize, zipCodeSanitize } from "../../helpers";
import { Link, useParams } from "react-router-dom";
import Tabs from "../../partials/Tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Map from "../../partials/Map"

import { Thumb } from "./styles";

export default function Predio() {
	    
		const {id} = useParams();
		const [predio, setPredio] = useState({});
		const {info,add,contact = {},images = []} = predio;
		const {telephone = {},site,email = {}} = contact;
		const {numbers} = telephone;
		const {adds} = email;

		const tabContent = [
			{
				"component":"atividadesrecentes",
				"tag":"Atividades Recentes",
			},
			{
				"component":"galeria",
				"tag":"Galeria",
				"active": true,
				"images": images
			},
			{
				"component":"unidades",
				"tag":"Unidades"
			}
		]

		useEffect(() => {
			api.get(`/builds/${id}`).then((resp) => {
				setPredio(resp.data)
			})
		}, [id])

		if(add){
			var rua  = (add.place ? `${add.place}` : "" );
				rua += (add.street ? ` ${add.street}` : "" );
				rua += (add.number ? `, ${add.number}` : "" );
				rua += (add.zip_code ? ` - ${zipCodeSanitize(add.zip_code.toString())}` : "" );
			
			var bairro  = (info.district_name ? `${info.district_name}` : "" );
				bairro += (add.uf ? ` - ${add.uf}` : "" );
		}

		if(info){
			var class_name = (info.class_name ? capitalize(`${info.class_name}`) : "" );

			var administrator_name = (info.administrator_name ? capitalize(`${info.administrator_name}`) : "" );
			
			var dt_constr = (info.dt_constr ? info.dt_constr : "" );

			var developer_name = (info.developer_name ? capitalize(`${info.developer_name }`) : "" );
		}

    return (
      <>
        <div>
			<div className="col-md-12 col-sm-12 col-xs-12">
					<div className="x_panel">
						<div className="x_title">
							<h2>Perfil do Prédio</h2>
							<div className="clearfix"></div>
						</div>
						<div className="x_content profile">
							<div className="profile_left">
								<div className="profile_img">
									<Thumb>
										<img className="img-responsive avatar-view" src={`/images/builds/${id}/thumb.jpg`} alt="Avatar" title="Change the avatar" />
									</Thumb>
								</div>
								{info ? <h3>{capitalize(info.build_name)}</h3> : ""}
								<h4>Contato e Localização</h4>
								<ul className="list-unstyled user_data profile_build">
									<div className="grid-info-predio">
										{(rua || bairro) && (
											<>
												<FontAwesomeIcon 
												icon={['fas', 'map-marker']} 
												className="fa"
												/>
												<ul className="list-unstyled">
													{rua && <li>{rua}</li>}
													{bairro && <li>{bairro}</li>}
												</ul>
											</>
										)}
									</div>
									<div className="grid-info-predio">
										{numbers && numbers.length > 0 && (
											<>
												<FontAwesomeIcon 
													icon={['fas', 'phone-alt']} 
													className="fa"
												/>
												<ul className="list-unstyled">
													{numbers.map((t,i) => {
														return <li key={i}>{`(${t[0]})`} {t[1]}</li>
													})}
												</ul>
											</>
										)}
									</div>
									<div className="grid-info-predio">
										{adds && adds.length > 0 && (
											<>
												<FontAwesomeIcon 
													icon={['fas', 'at']} 
													className="fa"
												/>
												<ul className="list-unstyled">
													{adds.map((a,i) => {
														return <li key={i}>{a}</li>
													})}
												</ul>
											</>
										)}
									</div>
									<div className="grid-info-predio">
										{site && (
											<>
												<FontAwesomeIcon 
													icon={['fas', 'globe']} 
													className="fa"
												/>
												<ul className="list-unstyled">
													<li><Link to={site} target="_blank">{site}</Link></li>
												</ul>
											</>
										)}
									</div>
								</ul>

								<br />
								<h4>Administração e Construção</h4>
								<ul className="list-unstyled user_data profile_build">
									<li>
										<ul className="list-unstyled align-self">
											{class_name && <li><div className="grid-info-predio"><FontAwesomeIcon 
												icon={['fas', 'tag']} 
												className="fa"
											/>
											<h4><strong>{class_name}</strong></h4></div></li>}
											{class_name &&
												class_name === "Flat" && administrator_name && (<li><div className="grid-info-predio"><FontAwesomeIcon 
													icon={['fas', 'wrench']}
													className="fa"/>{administrator_name}</div></li>)
											}
											{dt_constr && 
												(
													<li><div className="grid-info-predio"><FontAwesomeIcon 
														icon={['fas', 'calendar-alt']} 
														className="fa"/>{dt_constr}</div></li>
												)
											}
											{developer_name && 
												(
													<li><div className="grid-info-predio"><FontAwesomeIcon 
														icon={['fas', 'calendar-alt']} 
														className="fa"/>{developer_name}</div></li>
												)
											}
										</ul>
									</li>
								
								</ul>
								<Link to="" className="btn btn-success"><i className="fa fa-edit m-right-xs"></i>Edit Profile</Link>
							</div>
							<div className="profile_right">

								{/* <div className="profile_title">
									<div className="col-md-6">
										<h2>Geolocalização</h2>
									</div>
								</div> */}

								<Tabs src={tabContent} />

								{rua && bairro && <Map search={`${rua} ${bairro}`} />}

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
    )
}