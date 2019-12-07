const { calculateSalary,
        checkDay,
        calculatePricePerDay 
    } = require("./index");

describe("calculateSalary",() =>{
        it("and has a correct formato of schedule", ()=>{
            const schedule={"MO":"10:00-12:00",
                            "TU":"10:00-12:00",
                            "TH":"01:00-03:00",
                            "SA":"14:00-18:00",
                            "SU":"20:00-21:00"}
            
            expect(calculateSalary(schedule)).toEqual(215);
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
        expect(checkDay("lalala")).toBe(null);
        expect(checkDay("")).toBe(null);
    });
});

describe("calculatePricePerDay",() => {
    it("it's Monday 10:00-12:00",()=>{
        expect(calculatePricePerDay({
            typeDay:"weekday",
            startHour:"10:00",
            endHour:"12:00"
        })).toBe(15);
    });

    it("it's Thursday 01:00-3:00",()=>{
        expect(calculatePricePerDay({
            typeDay:"weekday",
            startHour:"01:00",
            endHour:"03:00"
        })).toBe(25);
    });

    it("it's Saturday 14:00-18:00", ()=>{
        expect(calculatePricePerDay({
            typeDay:"weekend",
            startHour:"14:00",
            endHour:"18:00"
        })).toBe(20);
    });

    it("it's Wrong Date", ()=>{
        expect(calculatePricePerDay({
            typeDay:"lalala",
            startHour:"14:00",
            endHour:"18:00"
        })).toBe(null);
    });
});