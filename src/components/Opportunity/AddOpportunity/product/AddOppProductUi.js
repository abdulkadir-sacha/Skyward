import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { FlatList } from 'react-native-gesture-handler'
import { Chip, Menu } from 'react-native-paper'
import { strings } from '../../../../language/Language'
import { Colors, Images, Utils } from '../../../../utils'
import ResponsivePixels from '../../../../utils/ResponsivePixels'
import { Button, ChipViewContainer, CustomPicker, FloatingEditText, ProgressView, ScrollContainer, TextButton, ViewWithTitle } from '../../../common'

const AddOppProductUi = ({ products, oppProducts, onSearchProduct, loading, onAddProduct, onTextChanged, productGroups, productCategories, selectedIndex, onSelectProduct }) => {
    let selectedProduct = {}

    if (products.length)
        selectedProduct = products[selectedIndex]

    // const [selectedProd, setselectedProdcu] = useState(initialState)

    const { name,
        productId,
        productGroupId,
        productCategoryId,
        qty,
        amount,
        rate,
        specification,
        description
    } = selectedProduct

    const [visible, setVisible] = useState(false)
    console.log("selectedProduct", selectedProduct)
    return (
        <ScrollContainer>
            {loading ? <ProgressView /> : <View style={styles.mainView}>
                <ViewWithTitle innerStyle={{
                    backgroundColor: Colors.secondary50, paddingHorizontal: 0,
                    paddingVertical: 0,
                }} title="Product Information">

                    <View style={{ backgroundColor: Colors.secondary50, paddingHorizontal: 16, paddingVertical: 8, flexDirection: "row" }}>
                        <Chip onPress={onAddProduct} textStyle={{ fontSize: 13, color: Colors.white }}
                            style={{ margin: 5, backgroundColor: Colors.blue, }}
                        >+</Chip>
                        <ScrollView horizontal>
                            {products.map((item, index) => <Chip key={index} style={{ margin: 5, backgroundColor: selectedIndex === index ? Colors.secondary500 : Colors.white }}
                                textStyle={{ fontSize: 13, color: selectedIndex === index ? Colors.white : Colors.blueGray900 }}
                                onPress={() => onSelectProduct && onSelectProduct(index)}>{item.name}</Chip>)}
                        </ScrollView>
                    </View>
                    <View style={{ backgroundColor: Colors.white, paddingHorizontal: 16 }}>
                        {/* <FloatingEditText onChangeText={(text) => {

                            setVisible(text.length > 0)
                            onSearchProduct(text)
                        }} label={`Product Name ${selectedIndex + 1}`} />

                        <FlatList
                            style={{ height: 200, backgroundColor: "white", zIndex: 1, elevation: 2, position: "absolute", top: 80 }}
                            data={oppProducts}
                            renderItem={({ item }) => <Menu.Item onPress={() => { }} title={item.name} />}
                        /> */}
                        {/* <Menu
                            visible={visible}
                            onDismiss={() => { setVisible(false) }}
                            contentStyle={{
                                height: 200,
                                marginTop: 80
                            }}
                            anchor={}>
                            {
                                oppProducts.map((p) => <Menu.Item onPress={() => { }} title={p.name} />)
                            }

                        </Menu> */}

                        {/* <FlatList 
                        
                        /> */}
                        <CustomPicker onSelect={(item) => onTextChanged("productId", item.id)} list={oppProducts} label={`Product Name ${selectedIndex + 1}`} rightIcon={Images.ic_down} />
                        <CustomPicker selectedItem={{ id: productCategoryId }} onSelect={(item) => onTextChanged("productCategoryId", item.id)} list={productCategories} label={strings.prod_category} rightIcon={Images.ic_down} />
                        <CustomPicker selectedItem={{ id: productGroupId }} onSelect={(item) => onTextChanged("productGroupId", item.id)} list={productGroups} label={strings.prod_group} rightIcon={Images.ic_down} />
                        <ChipViewContainer title={strings.level} chips={[{ name: "Dealer price" }, { name: "End Customer price" }, { name: "OEM Price" }, { name: "MOP" }]} />

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <FloatingEditText value={qty} inputType={"numeric"} onChangeText={(text) => onTextChanged("qty", text)} style={{ flex: 1, }} label={strings.quantity} />
                            <FloatingEditText value={rate} inputType={"numeric"} onChangeText={(text) => onTextChanged("rate", text)} style={{ flex: 1, marginStart: 8 }} label={strings.rate} />
                            <FloatingEditText value={amount} inputType={"numeric"} onChangeText={(text) => onTextChanged("amount", text)} style={{ flex: 1, marginStart: 8 }} label={strings.amount} />

                        </View>
                        <FloatingEditText value={specification} onChangeText={(text) => onTextChanged("specification", text)} label={strings.competition_status} />
                        <FloatingEditText value={description} onChangeText={(text) => onTextChanged("description", text)} label={strings.description} />
                        <TextButton title={`Delete product ${selectedIndex + 1}`} />
                    </View>
                </ViewWithTitle>

                <View style={{ flexDirection: "row", margin: ResponsivePixels.size16, alignItems: "center", justifyContent: "space-evenly" }}>
                    <Button title="Cancel" bordered style={{ width: 100, marginEnd: 8 }} />
                    <Button title={strings.submit} style={{ flex: 1, }} />
                </View>
            </View>}
        </ScrollContainer>
    )
}

export default AddOppProductUi

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.secondary50
    }
})
