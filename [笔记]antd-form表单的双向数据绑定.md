从一个Form.create说起

ant-design的create源码如下
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

来看createDOMForm方法，在rc-form/createDOMForm.js中，这个高阶函数中
除了定义一react的几个生命周期，还定义了将近20个函数，处理数据。
数据会存储在一个叫fieldsStore的对象中。
其中有个方法叫getFieldDecorator方法是我们业务组价中定义form表单包裹组件的方法。后面马上回讲到

```
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

从一个Input组件来看getFieldDecorator
```
<FormItem {...formItemLayout} label='店铺总链接数'>
     {getFieldDecorator('storeLinkNum', {
         rules: [
             { required: true, message: '必填项' },
             { validator: storeLinkNumValidator }
         ]
        }
        )(<Input suffix={<span>个</span>} placeholder='请输入' maxLength={50} />)
     }
</FormItem>
```

简化一下就是一个函数getFieldDecorator传入两个参数，返回值是一个函数接收一个JSX element
```
getFieldDecorator('storeLinkNum', {key: value})(<Input {...props} />)
```

查看rc-form组件库的getFieldDecorator方法
```
getFieldDecorator: function getFieldDecorator(name, fieldOption) {
        var _this2 = this;

        var props = this.getFieldProps(name, fieldOption);
        return function (fieldElem) {
          // We should put field in record if it is rendered
          _this2.renderFields[name] = true;

          var fieldMeta = _this2.fieldsStore.getFieldMeta(name);
          var originalProps = fieldElem.props;
          if (process.env.NODE_ENV !== 'production') {
            var valuePropName = fieldMeta.valuePropName;
            warning(!(valuePropName in originalProps), '`getFieldDecorator` will override `' + valuePropName + '`, ' + ('so please don\'t set `' + valuePropName + '` directly ') + 'and use `setFieldsValue` to set it.');
            var defaultValuePropName = 'default' + valuePropName[0].toUpperCase() + valuePropName.slice(1);
            warning(!(defaultValuePropName in originalProps), '`' + defaultValuePropName + '` is invalid ' + ('for `getFieldDecorator` will set `' + valuePropName + '`,') + ' please use `option.initialValue` instead.');
          }
          fieldMeta.originalProps = originalProps;
          fieldMeta.ref = fieldElem.ref;
          return React.cloneElement(fieldElem, _extends({}, props, _this2.fieldsStore.getFieldValuePropValue(fieldMeta)));
        };
      },
```

可以看出上面的代码做了两件事，

1. 获取了对象{key:value}中的所有属性

2. 通过React.cloneElement克隆了一份组件并把组件对应的props放进去。其实就是给子组件传值

`react中给子组件传值的一种方法是React.cloneElement，也就是把业务组件中的值传递给Input`

3. WrappedComponent组件中每个被getFieldDecorator包裹的form表单都会执行getFieldDecorator方法。



操作数据的所有方法都在FieldsStore对象中，内置了十几个方法操作数据

更新值的方法是setFieldMeta 值存在于fieldsMeta对象，fieldsMeta包含了当前所有form表单上的getFieldDecorator(name, fieldOption)

对应的name字段。


再说getValueFromEvent方法，用来获取`target.value`

通过调用onValuesChange方法更新数据，那么这个onValuesChange来自哪里呢？

getFieldProps获取修改的props,通过一段代码说明触发时修改对应的值
```
// make sure that the value will be collect
if (trigger && validateTriggers.indexOf(trigger) === -1) {
    inputProps[trigger] = this.getCacheBind(name, trigger, this.onCollect);
}
```

可以看出是createBaseForm函数的其中一个参数

createBaseForm函数在createDOM函数中用到，也在createDOMForm中用到


再来看一个核心的函数setFields,
```
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
这个函数内包含了forceUpdate

>如果 render() 方法从 this.props 或者 this.state 之外的地方读取数据，你需要通过调用 forceUpdate() 告诉 React 什么时候需要再次运行 render()。如果直接改变了 this.state，也需要调用 forceUpdate()。调用 forceUpdate() 将会导致 render() 方法在相应的组件上被调用，并且子级组件也会调用自己的 render()，但是如果标记改变了，那么 React 仅会更新 DOM。




