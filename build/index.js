"use strict";

var List = React.createClass({
    displayName: "List",

    componentDidUpdate: function componentDidUpdate() {
        if (this.refs.nameInput) {
            this.refs.nameInput.focus();
        }
    },
    render: function render() {

        var self = this;

        self.edity = function (e) {
            self.props.items[e.currentTarget.id].action = 1;
            self.setState({ items: self.props.items });
        };

        self.save = function (e) {
            self.props.items[e.target.id].action = 0;
            self.props.items[e.target.id].name = e.target.value;
            self.setState({ items: self.props.items });
        };

        self["delete"] = function (e) {
            self.props.items.splice(e.currentTarget.id, 1);
            self.setState({ items: self.props.items });
        };

        self.colorf = function (e) {
            for (var i = 0; i < self.props.items.length; i++) {
                self.props.items[i]["class"] = "";
            }
            if (self.props.items[e.target.id]) self.props.items[e.target.id]["class"] = "color";
            self.setState({ items: self.props.items });
        };

        self.createName = function (index) {
            if (self.props.items[index].action == 1) return React.createElement("input", { id: index, onBlur: self.save, ref: "nameInput", defaultValue: self.props.items[index].name });else return self.props.items[index].name;
        };

        self.createButton = function (index) {
            if (self.props.items[index].flagDelete && self.props.items[index].action == 0) return React.createElement(
                "button",
                { id: index, onClick: self["delete"] },
                'delete'
            );
        };

        self.createMenu = function (index) {
            return React.createElement(
                "span",
                null,
                React.createElement("input", { type: "checkbox", defaultChecked: self.props.items[index].menu, ref: "menu" }),
                " ",
                'menu'
            );
        };

        self.createItem = function (item, index) {

            return React.createElement(
                "li",
                { id: index, key: index + item.name, className: item["class"], onClick: self.colorf, onDoubleClick: self.edity },
                self.createName(index),
                React.createElement(
                    "div",
                    { className: "panel" },
                    self.createMenu(index),
                    self.createButton(index)
                )
            );
        };

        return React.createElement(
            "ul",
            null,
            this.props.items.map(self.createItem)
        );
    }
});

var Form = React.createClass({
    displayName: "Form",

    getInitialState: function getInitialState() {
        return { value: '', 'menu': false };
    },
    handleChange: function handleChange(event) {
        this.setState({ value: event.target.value });
    },
    handleChangeMenu: function handleChangeMenu(event) {
        this.setState({ menu: event.target.checked });
    },
    getDate: function getDate() {
        var date = this.state;
        this.state = { value: '', 'menu': false };
        return date;
    },

    render: function render() {
        if (this.props.items.state.visible) return React.createElement(
            "div",
            { className: "margin46" },
            React.createElement("input", { type: "text", value: this.state.value, onChange: this.handleChange, ref: "nameMenu" }),
            React.createElement(
                "span",
                null,
                React.createElement("input", { type: "checkbox", onChange: this.handleChangeMenu, checked: this.state.menu, ref: "addmenu", value: "" }),
                " ",
                'menu'
            ),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(ButtonEl, { items: { 'class': 'add150', "function": this.props.items.functionSave, "text": 'OK', 'visible': true } }),
            React.createElement(ButtonEl, { items: { 'class': 'add150', "function": this.props.items.functionClose, "text": 'Close', 'visible': true } })
        );
        return false;
    }
});

var ButtonEl = React.createClass({
    displayName: "ButtonEl",

    render: function render() {
        var items = this.props.items;
        if (items.visible) return React.createElement(
            "button",
            { className: items["class"], onClick: items["function"] },
            items.text
        );
        return false;
    }
});
var Test = React.createClass({
    displayName: "Test",

    getInitialState: function getInitialState() {
        return { items: [{ name: 'Home Page', action: 0, "class": '', flagDelete: 0, menu: false }], visible: false };
    },
    addPage: function addPage() {
        var nextItems = this.state.items.concat([{ name: '', action: 1, "class": '', flagDelete: 1, menu: false }]);
        this.setState({ items: nextItems, visible: false });
    },
    addPage2: function addPage2() {
        this.setState({ visible: true });
    },
    closeForm: function closeForm() {
        this.setState({ 'visible': false });
    },
    saveForm: function saveForm() {
        var form = this.refs.form.getDate();

        var nextItems = this.state.items.concat([{ name: form.value, action: 0, "class": '', flagDelete: 1, menu: form.menu }]);
        this.setState({ items: nextItems, visible: false });
    },
    render: function render() {

        return React.createElement(
            "div",
            null,
            React.createElement(
                "span",
                { className: "text" },
                "test"
            ),
            React.createElement(List, { items: this.state.items }),
            React.createElement(Form, { ref: "form", items: { 'state': this.state, 'functionClose': this.closeForm, 'functionSave': this.saveForm } }),
            React.createElement(ButtonEl, { items: { 'class': 'add', "function": this.addPage, "text": 'Add page 1', 'visible': !this.state.visible } }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(ButtonEl, { items: { 'class': 'add', "function": this.addPage2, "text": 'Add page 2', 'visible': !this.state.visible } })
        );
    }
});

ReactDOM.render(React.createElement(Test, null), content);