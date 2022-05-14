从一个 Form.create 说起

ant-design 的 create 源码如下

```
static create = function<TOwnProps extends FormComponentProps>(
    options: FormCreateOption<TOwnProps> = {},
  ): FormWrappedProps<TOwnProps> {
    return createDOMForm({
      fieldNameProp: 'id',
      ...options,
      fieldMetaProp: FIELD_META_PROP,
      fieldDataProp: FIELD_DATA_PROP,
    });
  };
```

来看 createDOMForm 方法，在 rc-form/createDOMForm.js 中，这个高阶函数中
除了定义一 react 的几个生命周期，还定义了将近 20 个函数，处理数据。
数据会存储在一个叫 fieldsStore 的对象中。
其中有个方法叫 getFieldDecorator 方法是我们业务组价中定义 form 表单包裹组件的方法。后面马上回讲到

```javascript
function createBaseForm() {
    return function decorate(WrappedComponent) {
        var Form = createReactClass({
            render: function render() {
               <!--省略不重要的代码，返回核心代码，最终是创建了一个组react Element其实就是个高阶函数-->
               return React.createElement(WrappedComponent, props);
             }
           });
        })
        return argumentContainer(Form, WrappedComponent);
    }
}
```

从一个 Input 组件来看 getFieldDecorator

```javascript
<FormItem {...formItemLayout} label="店铺总链接数">
  {getFieldDecorator('storeLinkNum', {
    rules: [{ required: true, message: '必填项' }, { validator: storeLinkNumValidator }]
  })(<Input suffix={<span>个</span>} placeholder="请输入" maxLength={50} />)}
</FormItem>
```

简化一下就是一个函数 getFieldDecorator 传入两个参数，返回值是一个函数接收一个 JSX element

```javascript
getFieldDecorator('storeLinkNum', { key: value })(<Input {...props} />);
```

查看 rc-form 组件库的 getFieldDecorator 方法

```javascript
getFieldDecorator: function getFieldDecorator(name, fieldOption) {
        var _this2 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          // We should put field in record if it is rendered
          _this2.renderFields[name] = true;

          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
          var originalProps = fieldElem.props;

          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return React.cloneElement(fieldElem, _extends({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
```

可以看出上面的代码做了两件事，

1. 获取了对象{key:value}中的所有属性

2. 通过 React.cloneElement 克隆了一份组件并把组件对应的 props 放进去。其实就是给子组件传值

`react中给子组件传值的一种方法是React.cloneElement，也就是把业务组件中的值传递给Input`

3. WrappedComponent 组件中每个被 getFieldDecorator 包裹的 form 表单都会执行 getFieldDecorator 方法。

操作数据的所有方法都在 FieldsStore 对象中，内置了十几个方法操作数据

更新值的方法是 setFieldMeta 值存在于 fieldsMeta 对象，fieldsMeta 包含了当前所有 form 表单上的 getFieldDecorator(name, fieldOption)

对应的 name 字段。

再说 getValueFromEvent 方法，用来获取`target.value`

通过调用 onValuesChange 方法更新数据，那么这个 onValuesChange 来自哪里呢？

getFieldProps 获取修改的 props,通过一段代码说明触发时修改对应的值

```javascript
// make sure that the value will be collect
if (trigger && validateTriggers.indexOf(trigger) === -1) {
  inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
}
```

可以看出是 createBaseForm 函数的其中一个参数

createBaseForm 函数在 createDOM 函数中用到，也在 createDOMForm 中用到

再来看一个核心的函数 setFields,

```javascript
setFields: function setFields(maybeNestedFields, callback) {
        var _this4 = this;

        var fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields);
        this.fieldsStore.setFields(fields);
        if (onFieldsChange) {
          var changedFields = Object.keys(fields).reduce(function (acc, name) {
            return set(acc, name, _this4.fieldsStore.getField(name));
          }, {});
          onFieldsChange(_extends(_defineProperty({}, formPropName, this.getForm()), this.props), changedFields, this.fieldsStore.getNestedAllFields());
        }
        this.forceUpdate(callback);
```

这个函数内包含了 forceUpdate

> 如果 render() 方法从 this.props 或者 this.state 之外的地方读取数据，你需要通过调用 forceUpdate() 告诉 React 什么时候需要再次运行 render()。如果直接改变了 this.state，也需要调用 forceUpdate()。调用 forceUpdate() 将会导致 render() 方法在相应的组件上被调用，并且子级组件也会调用自己的 render()，但是如果标记改变了，那么 React 仅会更新 DOM。
