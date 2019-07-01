import React, { Component } from 'react';
import MeasureList from '../../components/MeasureList/MeasureList';
import measures_json from '../../data/measures.json'

import './Layout.css'

class Layout extends Component {

    state = {
        measures: measures_json,
        filtered: measures_json,
        inputVal: "",
        currentDoc: "DocA"
    }

    handleEnter(e) {
        if (e.key === 'Enter') {
            window.open(`http://192.168.68.104:5000/file/${this.state.currentDoc}`)
        }
    }

    updateInput(e) {
        if (e.target.value[0] === '#') {
            this.setState({
                inputVal: e.target.value,
                filtered: this.state.measures
                .filter(item => {
                    let val = e.target.value.toLowerCase();
                    let cats = item.classes;
                    cats = cats.filter(cat => cat.toLowerCase().includes(val.slice(1)))
                    return cats.length > 0
                })
            })

        } else if (e.target.value[0] === '@') {
            this.setState({inputVal: e.target.value});

            const inputVal = e.target.value.slice(1);

            if (/^(Doc[A-L])$/.test(inputVal)) {
                this.setState({currentDoc: inputVal})
            }

        } else {
        this.setState({
            inputVal: e.target.value,
            filtered: this.state.measures
            .filter(item => (item.name.toLowerCase() + item.def.toLowerCase()).includes(e.target.value.toLowerCase())
            )
        })
    }
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <input
                            className="layout-input"
                            placeholder="Search for a measure"
                            type="text"
                            onChange={ (e) => this.updateInput(e) }
                            value={this.state.inputVal}
                            onKeyPress={(e) => this.handleEnter(e)}
                            autoFocus/>
                    </div>
                </div>
                <div className="row measure-list">
                    <MeasureList displayedMeasures={this.state.filtered}/>
                </div>
            </div>
        );
    }
}

export default Layout;