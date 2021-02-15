import {fetchAllProperties, propertiesFetchBegin} from "./properties";


describe("when using the properties action",()=>{
    const dispatch = jest.fn();
    describe("when using fetch properties",()=>{

        beforeEach(()=>{
            jest.resetAllMocks();
        })

        it("should call begin and fetch by default",()=>{
            fetchAllProperties()(dispatch, ()=>{return {} });
            expect(dispatch).toBeCalledTimes(2);
            expect(dispatch).toBeCalledWith(propertiesFetchBegin());
        })

        it("should skip any calls if the state is already loading",()=>{
            fetchAllProperties()(dispatch, ()=>{return {loading:true} });
            expect(dispatch).toBeCalledTimes(0);
        })
    });
})