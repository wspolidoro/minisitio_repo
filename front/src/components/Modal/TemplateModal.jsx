import React, { useState } from 'react';

//Components
import ContentChildLogin from './ContentChildLogin';
import ContentChildForm from './ContentChildForm';

const TemplateModal = (props) => {

  const [elemento, setValue] = useState(false);

  const mostrarElemento = (param) => {
    setValue(param)
  }

    return (
        <div className='template-modal'>
{/*             <div className="container mt-3">
  <h3>Extra Large Modal Example</h3>
  <p>Click on the button to open the modal.</p>
  
  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
    Open modal
  </button>
</div>
 */}
{/* <!-- The Modal --> */}
<div className="modal fade" id="myModal">
  <div className="modal-dialog modal-xl">
    <div className="modal-content">


     {/*  <!-- Modal body --> */}
      <div className="modal-body">

      {elemento ? <ContentChildForm onContinue={mostrarElemento} descontoAtivado={props.descontoAtivado} radioCheck={props.radioCheck} tagValue={props.tagValue} /> : <ContentChildLogin onContinue={mostrarElemento} descontoAtivado={props.descontoAtivado} radioCheck={props.radioCheck} tagValue={props.tagValue} />}
       
      </div>

      {/* <!-- Modal footer --> */}
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">fechar</button>
      </div>

    </div>
  </div>
</div>
        </div>
    )
};

export default TemplateModal;