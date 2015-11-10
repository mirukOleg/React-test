
var List = React.createClass({

    componentDidUpdate: function(){
        if(this.refs.nameInput){
            this.refs.nameInput.focus();
        }
    },
    render: function() {

        var self=this;

        self.edity = function(e){
            self.props.items[e.currentTarget.id].action=1;
            self.setState({items:self.props.items} );
         }

        self.save = function(e){
            self.props.items[e.target.id].action=0;
            self.props.items[e.target.id].name=e.target.value;
            self.setState({items:self.props.items} );
        }

        self.delete = function(e){
            self.props.items.splice(e.currentTarget.id,1);
            self.setState({items:self.props.items} );
        }

        self.colorf=function(e){
            for (var i = 0; i < self.props.items.length;  i++) {
                self.props.items[i].class="";
            }
            if(self.props.items[e.target.id])
            self.props.items[e.target.id].class="color";
            self.setState({items:self.props.items} );
        }

        self.createName = function(index){
            if(self.props.items[index].action==1)
                return <input id={index}  onBlur={self.save} ref="nameInput" defaultValue={self.props.items[index].name}/>
            else
                return self.props.items[index].name
        }

        self.createButton = function(index){
            if(self.props.items[index].flagDelete&&self.props.items[index].action==0)
                return <button  id={index} onClick={self.delete} >{'delete'}</button>
        }

        self.createMenu = function(index){
            return <span><input type="checkbox"  defaultChecked={self.props.items[index].menu} ref="menu"/> {'menu'}</span>;
        }

        self.createItem = function(item, index) {

            return <li id={index} key={index + item.name} className={item.class} onClick={self.colorf}onDoubleClick={self.edity}>
                            {self.createName(index)}
                            <div className="panel">
                                {self.createMenu(index)}
                                {self.createButton(index)}
                            </div>
                  </li>;
        };

        return <ul>{this.props.items.map(self.createItem)}</ul>;
    }
});

var Form = React.createClass({
    getInitialState: function() {
        return {value: '', 'menu': false};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    handleChangeMenu: function(event) {
        this.setState({menu: event.target.checked});
    },
    getDate:function(){
       var date = this.state;
       this.state={value: '', 'menu': false};
       return date;

    },

    render: function(){
        if(this.props.items.state.visible)
            return <div className='margin46'>
                <input type="text" value={this.state.value}  onChange={this.handleChange} ref='nameMenu'/><span>
                <input type="checkbox" onChange={this.handleChangeMenu} checked={this.state.menu}  ref="addmenu" value=""/> {'menu'}</span>
                <br/><br/>
                <ButtonEl items={{'class':'add150',"function":this.props.items.functionSave,"text":'OK', 'visible':true}}  />
                <ButtonEl items={{'class':'add150',"function":this.props.items.functionClose, "text":'Close', 'visible':true}}  />
            </div>;
        return false;
    }
});


var ButtonEl = React.createClass({
    render: function(){
        var items=this.props.items;
        if(items.visible)
            return <button className={items.class} onClick={items.function} >{items.text}</button>;
        return false;
    }
})
var Test = React.createClass({
        getInitialState: function() {
            return {items: [{name:'Home Page',action:0,class: '',flagDelete:0, menu: false }], visible:false};
        },
        addPage: function(){var nextItems = this.state.items.concat([{name:'',action:1,class: '',flagDelete:1,menu:false}]);
            this.setState({items: nextItems, visible: false});},
        addPage2: function(){
                this.setState({visible:true});
            },
        closeForm: function(){
            this.setState({'visible':false});
        },
        saveForm: function(){
            var form = this.refs.form.getDate();

            var nextItems = this.state.items.concat([{name:form.value,action:0,class: '',flagDelete:1,menu:form.menu}]);
            this.setState({items: nextItems, visible: false});
        },
        render: function() {

            return (<div><span className="text">test</span>
                <List items={this.state.items} />
                <Form ref="form" items={{'state':this.state, 'functionClose': this.closeForm, 'functionSave': this.saveForm}} />
                <ButtonEl items={{'class':'add',"function":this.addPage,"text":'Add page 1', 'visible':!this.state.visible}}  />
                <br/><br/>
                <ButtonEl  items={{'class':'add',"function":this.addPage2,"text":'Add page 2',  'visible':!this.state.visible}}  />
            </div>

                );
        }
    });

ReactDOM.render(<Test/>,content);





