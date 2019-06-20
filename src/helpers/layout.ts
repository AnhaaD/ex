import { LayoutGrid } from '../components/Grid';

export const defaultLayouts = {
    lg: [
        {x: 0, y: 4.5, w: 5, h: 19, i: '0', minH: 8, minW: 4},
        {x: 19, y: 5, w: 5, h: 18, i: '1', minH: 6, minW: 4},
        {x: 5, y: 0, w: 14, h: 24, i: '2', minH: 22, minW: 8},
        {x: 0, y: 19, w: 19, h: 16, i: '3', minH: 6, minW: 8},
        {x: 0, y: 44, w: 19, h: 16, i: '4', minH: 6, minW: 8},
        {x: 19, y: 20, w: 5, h: 38, i: '5', minH: 6, minW: 5},
        {x: 0, y: 0, w: 5, h: 5, i: '6', minH: 5, minW: 5},
        {x: 0, y: 0, w: 5, h: 5, i: '7', minH: 5, minW: 5},
    ],
    md: [
        {x: 18, y: 10, w: 6, h: 22, i: '0', minH: 9, minW: 6},
        {x: 18, y: 30, w: 6, h: 19, i: '1', minH: 6, minW: 5},
        {x: 0, y: 0, w: 18, h: 31, i: '2', minH: 12, minW: 6},
        {x: 7, y: 40, w: 11, h: 30, i: '3', minH: 6, minW: 9},
        {x: 0, y: 30, w: 18, h: 10, i: '4', minH: 8, minW: 11},
        {x: 0, y: 40, w: 7, h: 30, i: '5', minH: 6, minW: 6},
        {x: 18, y: 5, w: 6, h: 4, i: '6', minH: 4, minW: 6},
        {x: 18, y: 0, w: 6, h: 5, i: '7', minH: 5, minW: 6},
    ],
    sm: [
        {x: 0, y: 5, w: 12, h: 16, i: '0', minH: 15, minW: 4, draggable: false, resizable: false},
        {x: 0, y: 21, w: 12, h: 19, i: '1', minH: 6, minW: 5, draggable: false, resizable: false},
        {x: 0, y: 40, w: 12, h: 30, i: '2', minH: 30, minW: 5, draggable: false, resizable: false},
        {x: 0, y: 70, w: 12, h: 12, i: '3', minH: 12, minW: 12, draggable: false, resizable: false},
        {x: 0, y: 82, w: 12, h: 12, i: '4', minH: 12, minW: 7, draggable: false, resizable: false},
        {x: 0, y: 94, w: 12, h: 20, i: '5', minH: 12, minW: 7, draggable: false, resizable: false},
        {x: 0, y: 0, w: 12, h: 5, i: '6', minH: 3, minW: 3, draggable: false, resizable: false},
        {x: 0, y: 114, w: 12, h: 5, i: '7', minH: 3, minW: 3, draggable: false, resizable: false},
    ],
};

export const getLayoutFromLS = (key: string): LayoutGrid | undefined => {
    let obj = {};
    if (localStorage) {
        try {
            obj = JSON.parse(localStorage.getItem('rgl') || '') || {};
        } catch (e) {
            // ignore
        }
    }
    return obj[key];
};

export const saveLayoutToLS = (key: string, value): void => {
    if (localStorage) {
        localStorage.setItem(
            'rgl',
            JSON.stringify({[key]: value}),
        );
    }
};

export const resetLayout = (key: string): void => {
    if (localStorage) {
        localStorage.setItem(
            'rgl',
            JSON.stringify({[key]: defaultLayouts}),
        );
    }
};


// WEBPACK FOOTER //
// src/drone/src/src/helpers/layout.ts
