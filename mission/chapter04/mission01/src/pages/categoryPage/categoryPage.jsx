import { Link } from "react-router-dom";
import CategoryCard from "../../components/categoryCard/categoryCard";
import styled from "styled-components";

const categoryList = [
    { title : "현재 상영 중인", value : "now-playing"},
    { title : "인기 있는", value : "popular"},
    { title : "높은 평가를 받은", value : "top-rated"},
    { title : "개봉 예정중인", value : "up-coming"}

]

const CategoryPage = ()=>{
    return(
        <CategoryContainer>
            <h2>카테고리</h2>
            <CateListBox>
                {categoryList.map((category)=>(
                    <Link to={`/movies/${category.value}`} key={category.value}><CategoryCard title = {category.title}/></Link>
                ))}
            </CateListBox>
        </CategoryContainer>
    )
}

export default CategoryPage;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 15px;
`
const CateListBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`