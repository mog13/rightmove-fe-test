import React from 'react';
import {mount, shallow} from 'enzyme';
import PropertyListing from '../PropertyListing';

import {propertyAPIResponse} from "../../../../_mocks_/properties";
import {withStore} from "../../../utils/testUtils";

describe('PropertyListing', () => {

    it('should render without crashing', () => {
        const wrapper = shallow(withStore(<PropertyListing/>));
        expect(wrapper.find('.PropertyListing')).toHaveLength(0);
    });

    it('should render one property car for each entry in the store', () => {
        const wrapper = mount(
            withStore(
                <PropertyListing/>,
                {properties: propertyAPIResponse}));

        expect(wrapper.find('PropertyCard')).toHaveLength(5);
    });
});
