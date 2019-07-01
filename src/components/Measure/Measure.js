import React from 'react';

import './Measure.css'

const measure = (props) => {

    return (
            <div className="measure container" onClick={
                (e) => window.open(`http://192.168.68.104:5000/file/${props.document}#page=${props.page}`, '_blank')
                }>
                <div className="row">
                    <h3 className="measure-title col-12">
                    {props.title}
                    </h3>
                </div>
                <div className="row">
                    <span className="measure-definition col-12">
                    {props.definition}
                    </span>
                </div>
            </div>
    );
}

export default measure;