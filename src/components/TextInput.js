import React,{Component} from "react";
export default class TextInput extends Component{
    render(){
        return (
            <div className="input-block">
                <form>
                  <textarea className="text"/>
                </form>
            </div>
        )
    }

}