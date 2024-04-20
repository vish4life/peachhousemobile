import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('peachhousev01');

export const createMenuTable = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('create table if not exists menu (id integer primary key not null, uuid text, title text, description text, price text, imgPath text,category text);');
        },
            reject,
            resolve
        );
    });
};

export const getMenuFromDb = async () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menu', [], (_, { rows }) => {
                resolve(rows._array);
            });
            (error) => { reject(error) }
        })
    });
};

export const saveMenuInDb = (input) => {
    return new Promise((resolve, reject) => {
        const values = input.map(item => [item.id, item.title, item.description, item.price, item.imgPath, item.category]);
        const placeHolder = values.map(() => ('(?,?,?,?,?,?)')).join(',');
        console.log(placeHolder);
        const flatList = values.flat();
        db.transaction((tx) => {
            tx.executeSql(`insert into menu (uuid,title,description,price,imgPath,category)values ${placeHolder}`, flatList,
                (_, result) => { console.log(result) }
            )
        })
        resolve,
            reject
    });
};


export const filterByQueryActiveCategories = async (query,activeCategories) => {
    console.log('length of query: ', query.length);
    return new Promise((resolve, reject) => {
        if (query.length > 0) {
            db.transaction((tx) => {
                tx.executeSql('select * from menu where title like (?) or category like (?) ', [`%${query}%`,`%${query}%`], (_, { rows }) => {
                    if (rows._array.length > 0) {
                        console.log(rows._array.length, ' menu fetched');
                        resolve(rows._array)
                    } else {
                        console.log('no menu fetched');
                        resolve(rows._array);
                    }

                }
                );
            },
                (error) => { reject(error); }
            );
        }
        if(activeCategories.length>0){
            // console.log('came to active categories ',activeCategories.length,' : ',activeCategories);
            const searchCategories = [...activeCategories];
            console.log('came to active categories ',searchCategories.length,' : ',searchCategories);
            const placeHolders = searchCategories.map(()=>('(?)')).join(',');
            console.log(placeHolders);
            db.transaction((tx)=>{
                tx.executeSql(`select * from menu where category in (${placeHolders})`,searchCategories,(_,{rows})=>{
                    if(rows._array.length >0){
                        console.log(rows._array.length,' ',rows._array,' rows fetched');
                        resolve(rows._array);
                    }else{
                        console.log('no rows fetched');
                    }
                });
                (error)=>reject(error);
            });
        }
    })
};