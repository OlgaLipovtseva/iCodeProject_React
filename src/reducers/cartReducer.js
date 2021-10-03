import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "../constants/cart-actions";

const initState = {
  addedItems: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  //INSIDE STORE COMPONENT
  if (action.type === ADD_TO_CART) {
    let addedItem = action.product;
    //check if product already in the cart by (index+chosen size)
    let existed_item = state.addedItems.find(
      (item) =>
        addedItem.index === item.index &&
        addedItem.chosenSize === item.chosenSize
    );

    if (existed_item) {
      existed_item.quantity = existed_item.quantity + 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = action.product;
    //calculating the total
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    //console.log(itemToRemove);
    let new_items = state.addedItems.filter((item) => !(itemToRemove === item));

    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    let addedItem = action.product;
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = action.product;
    //calculating the total
    let newTotal = state.total - addedItem.price;

    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => !(addedItem === item));
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      return {
        ...state,
        total: newTotal,
      };
    }
  } else {
    return state;
  }
};

export default cartReducer;
