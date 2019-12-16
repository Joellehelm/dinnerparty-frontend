import React, { Component } from 'react';


class Search extends Component {
    constructor(){
        super()

        this.state = {
           allCuisines: [],
           allDiets: []
        }
    }

    componentDidMount(){
        this.setState({
            allCuisines: ["African", 
            "American",
            "British",
            "Cajun",
            "Caribbean",
            "Chinese",
            "Eastern European",
            "European",
            "French",
            "German",
            "Greek",
            "Indian",
            "Irish",
            "Italian",
            "Japanese",
            "Jewish",
            "Korean",
            "Latin American",
            "Mediterranean",
            "Mexican",
            "Middle Eastern",
            "Nordic",
            "Southern",
            "Spanish",
            "Thai",
            "Vietnamese"]
        })

        this.setState({
            allDiets: [
                "Gluten Free",
                "Ketogenic",
                "Vegetarian",
                "Lacto-Vegetarian",
                "Ovo-Vegetarian",
                "Vegan",
                "Pescetarian",
                "Paleo",
                "Primal",
                "Whole 30"
            ]
        })

        
    }



    mapDiets = () => {
        return this.state.allDiets.map((diet, idx) => {return <option key={idx} name="diet" value={diet}>{diet}</option>})
    }

    


    mapCuisines = () => {
        return this.state.allCuisines.map((cuisine, idx) => {return <option key={idx} name="cuisine" value={cuisine}>{cuisine}</option>})
    }


    render() {
        return (
            <div>
                {this.props.search}
                {this.props.selected}
                <form onSubmit={this.props.handleSubmit}>
               <select onChange={this.props.handleChange} name="Cuisine">
                   <option defaultValue>Cuisine Type</option>
                   {this.mapCuisines()}
                   </select>


                   <select onChange={this.props.handleChange} name="Diet">
                   <option defaultValue>Dietary Restrictions</option>
                   {this.mapDiets()}
                   </select>


                   <input onChange={this.props.handleChange} name="query" placeholder="Search..."/>
                   <button name="submit">Submit</button>
                   </form>
            </div>
        );
    }
}

export default Search;