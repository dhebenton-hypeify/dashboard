import { ArrowRight } from "../../../../assets/Icons";
import { Card } from "../../../../components/cards/Cards";
import { UsageCircleStat } from "../../../../components/charts/usage-circle/UsageCircle";


export default function DeploymentsTable({}) {
    return (
        <Card style="flex last-deploy-table sites-card-fade-up f-col g24">
            <p className="label trans">Deployments</p>
            <table className="deployments-table">
                <tbody>
                    <tr className="thead">
                        <th>
                            Deploy ID
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Duration
                        </th>
                        <th className="usage-circle-td">
                            Committer
                        </th>
                        <th className="usage-circle-td">
                            Timestamp
                        </th>
                        <th className="usage-circle-td">
                            Lighthouse
                        </th>
                        <th className="table-arrow">
                        </th>
                    </tr>
                    <tr className="deployment trans">
                        <td className="f-col g12">
                            <p className="table-deploy-id trans">#2301</p>
                            <p className="label trans">Fixed SEO meta tags</p>
                        </td>
                        <td>
                            <div className="f-col a-f-s">
                                <p className="last-deployments-table-status trans">Published</p>
                            </div>
                        </td>
                        <td>
                            <p className="label trans">2m 35s</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">Dhebenton</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">2025-06-26 09:42:13</p>
                        </td>
                        <td className="usage-circle-td">
                            <div className="f-col  a-f-s">
                                <UsageCircleStat size={38} stroke={3.6} progress={80} style="deployments-table-stat"/>
                            </div>
                        </td>
                        <td className="table-arrow">
                            <div className="f-col a-f-e">
                                <ArrowRight style="trans" />
                            </div>
                        </td>
                    </tr>
                    <tr className="deployment trans">
                        <td className="f-col g12">
                            <p className="table-deploy-id trans">#2301</p>
                            <p className="label trans">Fixed SEO meta tags</p>
                        </td>
                        <td>
                            <div className="f-col a-f-s">
                                <p className="last-deployments-table-status trans">Published</p>
                            </div>
                        </td>
                        <td>
                            <p className="label trans">2m 35s</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">Dhebenton</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">2025-06-26 09:3.72:13</p>
                        </td>
                        <td className="usage-circle-td">
                           <div className="f-col  a-f-s">
                                <UsageCircleStat size={38} stroke={3.6} progress={80} style="deployments-table-stat"/>
                            </div>
                        </td>
                        <td className="table-arrow">
                            <div className="f-col a-f-e">
                                <ArrowRight style="trans" />
                            </div>
                        </td>
                    </tr>
                    <tr className="deployment trans">
                        <td className="f-col g12">
                            <p className="table-deploy-id trans">#2301</p>
                            <p className="label trans">Fixed SEO meta tags</p>
                        </td>
                        <td>
                            <div className="f-col a-f-s">
                                <p className="last-deployments-table-status trans">Published</p>
                            </div>
                        </td>
                        <td>
                            <p className="label trans">2m 35s</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">Dhebenton</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">2025-06-26 09:3.72:13</p>
                        </td>
                        <td className="usage-circle-td">
                            <div className="f-col  a-f-s">
                                <UsageCircleStat size={38} stroke={3.6} progress={80} style="deployments-table-stat"/>
                            </div>
                        </td>
                        <td className="table-arrow">
                            <div className="f-col a-f-e">
                                <ArrowRight style="trans" />
                            </div>
                        </td>
                    </tr>
                    <tr className="deployment trans"> 
                        <td className="f-col g12">
                            <p className="table-deploy-id trans">#2301</p>
                            <p className="label trans">Fixed SEO meta tags</p>
                        </td>
                        <td>
                            <div className="f-col a-f-s">
                                <p className="last-deployments-table-status trans">Published</p>
                            </div>
                        </td>
                        <td>
                            <p className="label trans">2m 35s</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">Dhebenton</p>
                        </td>
                        <td className="usage-circle-td">
                            <p className="label trans">2025-06-26 09:42:13</p>
                        </td>
                        <td className="usage-circle-td">
                            <div className="f-col  a-f-s">
                                <UsageCircleStat size={38} stroke={3.6} progress={80} style="deployments-table-stat"/>
                            </div>
                        </td>
                        <td className="table-arrow">
                            <div className="f-col a-f-e">
                                <ArrowRight style="trans" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    )
}