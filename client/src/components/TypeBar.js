import React from 'react';
import { ListGroup } from 'react-bootstrap';  
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';





const TypeBar = observer(() => {
  const {product} = useContext(Context);

  return (
    <ListGroup>
      { product.types.map(type => 
        <ListGroup.Item 
        style={{cursor: 'pointer'}}
        action={type.id !== product.selectedType.id}
        onClick={() => product.setSelectedType(type)}
        key={type.id} >
            {type.name}
        </ListGroup.Item>
          

      )}
    </ListGroup>
  );
})
export default TypeBar;
 



