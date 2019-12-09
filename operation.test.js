const { calculateSalary,
        checkDay,
        calculatePricePerDay 
    } = require("./operations");

describe("calculateSalary",() => {
    let errorMock;

    beforeEach(()=>{
        errorMock = jest.fn();
        global.console.error = errorMock;
    });

        describe("and has a correct format of schedule", ()=>{
            it("It's MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00",()=>{
                const schedule={"MO":"10:00-12:00",
                                "TU":"10:00-12:00",
                                "TH":"01:00-03:00",
                                "SA":"14:00-18:00",
                                "SU":"20:00-21:00"}
                
                expect(calculateSalary(schedule)).toEqual(215);
                expect(errorMock).not.toHaveBeenCalled();
            });

            it("It's MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",()=>{
                const schedule={"MO":"10:00-12:00",
                                "TH":"12:00-14:00",
                                "SU":"20:00-21:00"}
                
                expect(calculateSalary(schedule)).toEqual(85);
                expect(errorMock).not.toHaveBeenCalled();
            });

        });

        describe("and has a no valid format of schedule", ()=>{
            it("and it's an invalid type of day",()=>{
                const schedule={"MO":"10:00-12:00",
                                "lalalal":"10:00-12:00",
                                "TH":"01:00-03:00",
                                "SA":"14:00-18:00",
                                "SU":"20:00-21:00"}
                
                expect(calculateSalary(schedule)).toEqual(-1);
                expect(errorMock).toHaveBeenCalled();
            });

            it("and it's an invalid format hour",()=>{
                const schedule={"MO":"33:70-12:00",
                                "TU":"10:00-12:00",
                                "TH":"12:90-03:00",
                                "SA":"14:00-18:00",
                                "SU":"20:00-21:00"}
                
                expect(calculateSalary(schedule)).toEqual(-1);
                expect(errorMock).toHaveBeenCalled();
            });

            it("and it's an invalid schedule",()=>{
                const schedule={"MO":"10:00-12:00",
                                "TU":"12:00-10:00",
                                "TH":"01:00-03:00",
                                "SA":"14:00-18:00",
                                "SU":"20:00-21:00"}
                
                expect(calculateSalary(schedule)).toEqual(-1);
                expect(errorMock).toHaveBeenCalled();
            });
        })
});

describe("checkDay",()=>{
    it("it's a weekday", ()=>{
        expect(checkDay("MO")).toBe("weekday");
        expect(checkDay("TH")).toBe("weekday");
    });

    it("it's a weekend", () => {
        expect(checkDay("SA")).toBe("weekend");
        expect(checkDay("SU")).toBe("weekend");
    });

    it("it's a wrong input", ()=>{
        expect(()=>checkDay("lalala")).toThrow('Invalid day');
        expect(()=>checkDay("")).toThrow('Invalid day');
    });
});

describe("calculatePricePerDay",() => {

    describe("and the data is valid", ()=>{
        it("it's Monday 10:00-12:00",()=> {
            expect(calculatePricePerDay({
                typeDay:"weekday",
                startHour:new Date(0,0,0,10,0),
                endHour:new Date(0,0,0,12,0)
            })).toEqual(30);
        });
    
        it("it's Thursday 01:00-3:00",()=>{
            expect(calculatePricePerDay({
                typeDay:"weekday",
                startHour:new Date(0,0,0,1,0),
                endHour:new Date(0,0,0,3,0)
            })).toBe(50);
        });
    
        it("it's Saturday 14:00-18:00", ()=>{
            expect(calculatePricePerDay({
                typeDay:"weekend",
                startHour:new Date(0,0,0,14,0),
                endHour:new Date(0,0,0,18,0)
            })).toBe(80);
        });
    
        it("it's Saturday 14:00-22:00", ()=>{
            expect(calculatePricePerDay({
                typeDay:"weekend",
                startHour:new Date(0,0,0,14,0),
                endHour:new Date(0,0,0,22,0)
            })).toBe(180);
        });
    
        it("it's Sunday 19:00-21:00", ()=>{
            expect(calculatePricePerDay({
                typeDay:"weekend",
                startHour:new Date(0,0,0,19,0),
                endHour:new Date(0,0,0,21,0)
            })).toBe(50);
        });
    });

    describe("and the data is invalid",()=>{
        it("it's invalid type day", ()=>{
            expect(calculatePricePerDay({
                typeDay:"lalala",
                startHour:"14:00",
                endHour:"18:00"
            })).toBe(null);
        });

        it("it's invalid format hour", ()=>{
            expect(calculatePricePerDay({
                typeDay:"lalala",
                startHour:"33:00",
                endHour:"55:00"
            })).toBe(null);

            expect(calculatePricePerDay({
                typeDay:"lalala",
                startHour:"33:00",
                endHour:"55:00"
            })).toBe(null);
        });
    });
});