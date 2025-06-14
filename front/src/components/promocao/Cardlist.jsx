import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import { masterPath } from "../../config/config";

import "../../assets/css/main.css";
import "../../assets/css/default.css";
import "../../assets/css/card.css";

import "bootstrap/dist/css/bootstrap.min.css";

//global functions
import { contadorVisualizacoes } from "../../globalFunctions/functions";

function Cardlist(props) {
  //console.log(props.codCity);

  const [uf, setUfs] = useState([]);
  const [caderno, setCaderno] = useState([]);
  const [cadUf, setCadUf] = useState([]);

/*   useEffect(() => {
    fetch(`${masterPath.url}/cadernos`)
      .then((x) => x.json())
      .then((res) => {
        setCaderno(res);
        //console.log(res)
      });
    fetch(`${masterPath.url}/ufs`)
      .then((x) => x.json())
      .then((res) => {
        setUfs(res);
        //console.log(res)
      });
    let cadernoUf = sessionStorage.getItem("uf: ");
    let cadernoCidade = sessionStorage.getItem("caderno: ");
    setCadUf([cadernoUf, cadernoCidade]);
  }, []); */

  function urlTransform(url) {
    //const url = "http://localhost:3032/api/files/sefer7_logo_full (1).jpg";
    const encodedUrl = encodeURI(url); // Codifica a URL corretamente
    return encodedUrl;
  }

  const cardListThumb = (imgName) => {
    if (imgName !== "teste" && imgName !== "0" && imgName != null) {
      return true;
    } else {
      return false;
    }
  }



  return (
    <div className="Cardlist" key={props.key}>
      {/* {console.log(props.descImagem)} */}
      <div className="container card my-2">
        <div className="row card-list">
          <div className="col-md-2 p-0 thumb">

            {cardListThumb(props.codImg) &&
              <img
                src={urlTransform(`${masterPath.url}/files/2/${props.codImg}`)}
                alt="Foto"
                className="h-100 w-100"
                loading="lazy"
              />

            }
            {/* props.codImg == "teste" &&
              <img
                src="../assets/img/logo.png"
                alt="Foto"
                className="h-100 w-100"
              /> */
            }
            {!cardListThumb(props.codImg) &&
              <img
                src="../assets/img/placeholder.png"
                alt="Foto"
                className="h-100 w-100"
              />
            }

          </div>
          <div className="col-md-10 col-9 py-1">
            <div className="container w-100 p-0">
              {/* row */}
              <div className="row text-start">
                <div className="col-md-12 col-xs-12 pesquisa-nome">
                  <h4 className="d-flex font-20 border-bottom border-secondary p-2">
                    {/* <i className="fa fa-tags"></i> */}
                    <div class="descTitle">Válida até {moment(props.promo.data_validade).format("DD/MM/YYYY")} ou término do estoque</div>

                  </h4>
                </div>
              </div>
              {/* row */ console.log("as", typeof(props.promo.anuncio.codAtividade), props.promo.anuncio.codAtividade)}
              <div className="row text-start px-3">
                <div className="col-md-12 col-xs-12 pesquisa-nome">
                  <h4 className="d-flex">{/* font-14 */}
                    <i className="fa fa-briefcase"></i>
                    <div class="atividade label-ativity">{props.promo.anuncio.codAtividade}</div>

                    {/*    {caderno.map((item) => {
                      if (item.codCaderno == props.codCity) {
                        //console.log(uf)
                        //const estado = uf.find(estado => estado.id_uf == props.anuncio.codUf)

                        return <span>{item.descEndereco}</span>
                        
                      }

                    })} */}
                  </h4>
                </div>
                <div className="col-md-12 col-xs-12 pesquisa-nome">
                  <h4 className="d-flex">{/* font-14 */}
                    <i className="fa fa-map-marker"></i>
                    <div className="endereco label-address">{!props.promo.anuncio.descEndereco ? "Endereço não informado" : props.promo.anuncio.descEndereco}</div>
                    {/*  <span>{props.anuncio.descEndereco}</span> */}
                    {/*  {caderno.map((item) => {
                      if (item.codCaderno == props.codCity) {
                        //console.log(uf)
                        //  const estado = uf.find(estado => estado.id_uf == props.anuncio.codUf)

                        return <span>{item.descEndereco}</span>
                        //return <span>{item.nomeCaderno} - {item.UF} </span>  
                      } 

                    })}*/}
                  </h4>
                </div>
              </div>
              {/* row */}
              <div className="row area-btn">
                <div className="col-md-12 d-flex justify-content-end btn-view-page">
                  <button>
                    <i className="fa fa-star"></i>{/*cadUf[1]*/}
                    <Link to={`/perfil/${props.promo.codAnuncio}?promocao=ativa`} onClick={() => contadorVisualizacoes(masterPath.url, props.promo.codAnuncio)}>
                      VER PROMOÇÃO
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardlist;
