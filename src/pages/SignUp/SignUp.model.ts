import libphonenumber from 'google-libphonenumber';

export class Country {
  iso: string;
  name: string;
  code: string;
  sample_phone: string;
  phone_mask: Array<Object>;

  constructor (iso: string, name: string) {
    this.iso = iso;
    this.name = name;

    let phoneUtil = libphonenumber.PhoneNumberUtil.getInstance(),
        PNF = libphonenumber.PhoneNumberFormat,
        PNT = libphonenumber.PhoneNumberType,
        country_example_number = phoneUtil.getExampleNumberForType(this.iso, PNT.MOBILE),
        
        example_number_formatted = phoneUtil.format(country_example_number, PNF.NATIONAL);
      
    this.sample_phone = example_number_formatted;
    this.code = "+" + country_example_number.getCountryCode();

    
    this.phone_mask = this.getMaskFromString(example_number_formatted);
  }

  getMaskFromString(string: string): Array<Object> {
    let _string_chars = string.split(''),
        _digit_reg_exp = new RegExp(/\d/),
        _mask = _string_chars.map((char) => {
       
          return (_digit_reg_exp.test(char)) ? _digit_reg_exp : char;
        });

    return _mask;
  }
}
