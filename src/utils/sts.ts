import OSS from "ali-oss";
import { REGION, BUCKET } from "@/constants";
import { getSts } from "@/api/sys";

export const getOSSClient = async () => {
  const { data } = await getSts();
  return new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: REGION,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: data.Credentials?.AccessKeyId,
    accessKeySecret: data.Credentials?.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    // stsToken: data.Credentials?.SecurityToken,
    // 填写Bucket名称。
    bucket: BUCKET,
    // 刷新临时访问凭证的时间间隔，单位为毫秒。
    refreshSTSTokenInterval: 5 * 1000,
  });
};
