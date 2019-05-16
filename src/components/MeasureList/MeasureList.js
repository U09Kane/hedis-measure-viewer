import React from 'react';
import Measure from '../Measure/Measure';
import Wrap from '../../hoc/Wrap'

const measureList = (props) => {

    const measures = props.displayedMeasures
        .map(measureObj => (
            <Measure
                key={measureObj.name}
                title={measureObj.name}
                definition={measureObj.def}
                document={measureObj.doc}
                page={measureObj.page}/>
        ))

    return (
        <Wrap>
            {measures}
        </Wrap>
    );

};

export default measureList