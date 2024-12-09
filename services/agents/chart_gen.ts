import { ChartData } from "chart.js";
import { ColorPalette } from "./color_pellete";
import { ILineDetail } from "@/models/m_line_detail";

export class ChartGen {
    static generateProperStackedChart(empSkills: any, workStations: string[], works: string[], colorPallete: ColorPalette, taktTime: number): any[] {
        let datasets: any[] = [];
        let linedata: number[] = [];
        // controller.sum_smvassign = 0;

        for (let i = 0; i < works.length; i++) {
            const work = works[i];

            let data: number[] = [];
            for (let k = 0; k < workStations.length; k++) {
                data[k] = 0; //bar height = 0, if not the employee's assigned job

                const key = workStations[k];
                let items: ILineDetail[] = empSkills[key];

                for (let key2 in items) {
                    let element: ILineDetail = items[key2];
                    let _title = element.station;
                    /*if (element.split_no) {
                        _title = `[split ${element.split_no}] ` + _title;
                    }*/

                    if (_title == work) {
                        data[k] = element.cycle_time ?? 0.1;
                        //bar height = given value
                        linedata[k] = taktTime;
                    }


                }
            }
            datasets[i] =
            {
                label: work,
                data: data,
                type: 'bar',
                backgroundColor: colorPallete.myPalette[i],
                order: 2
            };
        }

        return datasets;
    }

    static smartGenerateChartData(taktTime: number, lineDetails: ILineDetail[]) {
        //if it has real data, then visualize it.
        const empSkills: any = {};
        const workStations: any[] = [];
        const works: any[] = [];
        let colorCount = 0;
        let colorPallete: ColorPalette;
        let newChartData: ChartData<'bar'>;

        if (lineDetails) {
            for (let i = 0; i < lineDetails!.length; i++) {
                const item: ILineDetail = lineDetails![i];
                //init object-key if not existed
                if (item.station) {
                    /*let enm = item.employee_name;
                    if (enm?.length! > 12) {
                        enm = (item.employee_name)?.substring(0, 9) + "...";
                    }*/
                    const key = item.station.toString();

                    if (!empSkills[key]) {
                        empSkills[key] = [];
                        workStations.push(key);
                    }

                    const _title = item.station;
                    /*if (item.split_no) {
                        _title = `[split ${item.split_no}] ` + _title;
                    }*/

                    works.push(_title);
                    colorCount++;

                    //assign item
                    empSkills[key].push(item);
                }
            }

            workStations.sort((a, b) => a - b);

            colorPallete = new ColorPalette(colorCount);
            newChartData = {
                labels: workStations, //ควรเป็นชื่อพนักงาน
                datasets: this.generateProperStackedChart(empSkills, workStations, works, colorPallete, taktTime)
            };
            // const options
        } else {
            colorPallete = new ColorPalette(4);
            newChartData = {
                labels: ['Example 1', 'Example 2', 'Example 3', 'Example 4'], //ควรเป็นชื่อพนักงาน
                datasets: [
                    {
                        label: 'Process A', //ควรเป็นทักษะเครื่องจักร?
                        data: [0, 0, 0, 0],
                        type: 'bar',
                        backgroundColor: colorPallete.myPalette[0],
                    },
                    {
                        label: 'Process B', //ควรเป็นทักษะเครื่องจักร?
                        data: [0, 0, 0, 0],
                        type: 'bar',
                        backgroundColor: colorPallete.myPalette[1],
                        borderColor: colorPallete.myPalette[1],
                        borderWidth: 1,
                    },
                    {
                        label: 'Process C', //ควรเป็นทักษะเครื่องจักร?
                        data: [0, 0, 0, 0],
                        type: 'bar',
                        backgroundColor: colorPallete.myPalette[2],
                    },
                    {
                        label: 'Process D', //ควรเป็นทักษะเครื่องจักร?
                        data: [0, 0, 0, 0],
                        type: 'bar',
                        backgroundColor: colorPallete.myPalette[3],
                    },
                    /*{
                      label: 'Line Dataset',
                      data: [3, 3, 3, 3],
                      type: 'line',
                      // this dataset is drawn on top
                      order: 1
                    }*/
                ],
            };
        }


        return newChartData;
    }
}