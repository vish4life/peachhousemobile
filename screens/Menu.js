import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, SafeAreaView, FlatList, View, Image, TouchableOpacity } from "react-native";
import { getMenuFromDb, saveMenuInDb, createMenuTable, filterByQueryActiveCategories } from "../components/Database";
import { Searchbar } from "react-native-paper";
import debounce from 'lodash.debounce';

const MENU_API_URL = 'https://raw.githubusercontent.com/vish4life/peachhouse/main/src/Components/Data/menu.json';
const sections = ['Salads', 'PH Specialities', 'Desserts']
const Menu = () => {
    const [data, setData] = useState('');
    const [searchBarTxt, setSearchBarTxt] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );
    //this usestate will initiate the state of sections elements to false, meaning after sections.map is executed then the new mapped array will have [false,false,false] as values

    //Fetch function for extracting Menu from URL
    const fetchMenu = async () => {
        try {
            // console.log('came inside fetch menu using URL');
            const response = await fetch(MENU_API_URL);
            const json = await response.json();
            const menuList = json.menu;
            return menuList;

        } catch (error) {
            console.log('Error in fetchMenu for getSectionListData function: ', error);
        };
    }

    //useEffect hook to fetch Menu data on mount
    useEffect(() => {
        (async () => {
            try {
                await createMenuTable();
                let dbMenuList = await getMenuFromDb();
                if (!dbMenuList.length) {
                    // console.log('Menu not found in DB');
                    const menuItems = await fetchMenu();
                    saveMenuInDb(menuItems);
                } else {
                    // console.log(dbMenuList.length, 'menu items found in DB');
                    setData(dbMenuList);
                }
            } catch (error) {
                console.log(error, ' came in catch block');
            };
        })();
    }, []);


    const menuRender = ({ item }) => {
        return (
            <View style={styles.menuView}>
                <View style={styles.menuInnverView}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuDesc}>{item.description}</Text>
                    <Text style={styles.menuTitle}>{item.price}</Text>
                </View>
                <View>
                    <Image style={styles.menuImg} source={{ uri: item.imgPath }} />
                </View>
            </View>
        );
    };
    
    const lookup = useCallback((q)=>{console.log(q);setQuery(q)},[]);
    const handleSearchChange = (text) => {
        setSearchBarTxt(text);
        debouncedLookUp(text);
    };
    const debouncedLookUp = useMemo(()=>debounce(lookup,500),[lookup]);
    
    useEffect(()=>{
        (async () =>{
            const activeCategories = sections.filter((s,i)=>{
                if(filterSelections.every((item)=>item === false)){
                    return true;
                }
                return filterSelections[i];
            })
            const queryMenuList = await filterByQueryActiveCategories(query,activeCategories);
            console.log(queryMenuList,' menu list');
            setData(queryMenuList);
        })();
    },[filterSelections,query]);

    const Filters = () => {
        return(
            <View style={styles.filterContainer}>
                {sections.map((section,index)=>(
                    <TouchableOpacity
                        key={index}
                        onPress={()=>{
                            onChange(index);
                        }}
                        style={{
                            flex:1/sections.length,
                            justifyContent:'center',
                            alignItems:'center',
                            padding:16,
                            backgroundColor:filterSelections[index]? '#fa5c66' :'#ffff',
                            borderWidth:1,
                            borderColor:filterSelections[index] ? '#ffff' : '#fa5c66',
                        }}
                    >
                        <View>
                            <Text style={{color:filterSelections[index] ? '#ffff' : '#fa5c66',}}>{section}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };
    const onChange = async (index) => {
        const sectionsCopy = [...filterSelections];
        sectionsCopy[index] = !filterSelections[index];
        setFilterSelections(sectionsCopy);
    };


    return (
        <SafeAreaView keyboardDismissMode='on-drag' style={styles.container}>
            <Searchbar
                placeholder="Search"
                placeholderTextColor="#fa5c66"
                style={styles.search}
                iconColor='#fa5c66'
                inputStyle={{color:'#fa5c66',fontSize:24}}
                elevation={10}
                value={searchBarTxt}
                onChangeText={handleSearchChange}
            />
            <Filters />
            <FlatList
                data={data}
                renderItem={menuRender}
                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView>
    );
};
export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe8e8',
    },
    search:{
        backgroundColor:'#febec1',
    },
    menu: {
        margin: '5%',
    },
    menuHeader: {
        color: '#fa5c66',
        fontSize: 30,
        backgroundColor: '#ffff',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#fa5c66',
        borderRadius: 4,
        marginVertical: '2%',
    },
    menuView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems:'center',
        margin: '3%',
    },
    menuInnverView: {
        width: '70%',
    },
    menuTitle: {
        fontSize: 24,
        color: '#fa5c66',
    },
    menuDesc: {
        fontSize: 16,
        color: '#8c8c8c',
        marginVertical: '2%',
    },
    menuImg: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    filterContainer:{
        flexDirection:'row',

    },

});