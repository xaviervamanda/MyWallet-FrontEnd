import styled from "styled-components";

export default function TransactionsList ({transactionsInfos}){

    const reversedTransactionsInfos = [...transactionsInfos].reverse();

    return (
        <>  
            {reversedTransactionsInfos.map((t, index) => (
                <ListItemContainer key={index}>
                    <div>
                      <span>{t.date}</span>
                      <strong>{t.description}</strong>
                    </div>
                    <Value color={t.type === "outgoing" ? "negativo" : "positivo"}>{Number(t.value).toFixed(2)}</Value>
                    
                </ListItemContainer>

            ))}
        </>
    );
}

const ListItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  margin-left: 70px;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
