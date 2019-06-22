import cr from 'classnames';
import countries = require('i18n-iso-countries');
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
  connect,
  MapDispatchToPropsFunction,
} from 'react-redux';
import { isDateInFuture, monthNameToNumber } from '../../../../helpers';
import {RootState, selectCurrentLanguage} from '../../../../modules';
import {
    selectSendIdentitySuccess,
    sendIdentity,
} from '../../../../modules/user/kyc/identity';
import { labelFetch } from '../../../../modules/user/kyc/label';
import {
    Button,
    Dropdown,
} from '../../../../openware';
import { nationalities } from '../../../../translations/nationalities';
import { months } from '../../../translations/months';

interface ReduxProps {
    success?: string;
    lang: string;
}

interface DispatchProps {
    sendIdentity: typeof sendIdentity;
    labelFetch: typeof labelFetch;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface IdentityState {
    city: string;
    countryOfBirth: string;
    dayOfBirth: string;
    yearOfBirth: string;
    firstName: string;
    lastName: string;
    monthOfBirth: string;
    nationality: string;
    postcode: string;
    residentialAddress: string;
    cityFocused: boolean;
    dateOfBirthFocused: boolean;
    firstNameFocused: boolean;
    lastNameFocused: boolean;
    postcodeFocused: boolean;
    residentialAddressFocused: boolean;
}

type Props = ReduxProps & DispatchProps & InjectedIntlProps;

class IdentityComponent extends React.Component<Props, IdentityState> {
    public state = {
        city: '',
        countryOfBirth: '',
        dayOfBirth: '',
        yearOfBirth: '',
        firstName: '',
        lastName: '',
        monthOfBirth: '',
        nationality: '',
        postcode: '',
        residentialAddress: '',
        cityFocused: false,
        dateOfBirthFocused: false,
        firstNameFocused: false,
        lastNameFocused: false,
        postcodeFocused: false,
        residentialAddressFocused: false,
    };

    public translate = (e: string) => {
        return this.props.intl.formatMessage({id: e});
    };

    public componentDidUpdate(prev: Props) {
        if (!prev.success && this.props.success) {
            this.props.labelFetch();
        }
    }

    public render() {
        const {
            city,
            dayOfBirth,
            yearOfBirth,
            monthOfBirth,
            firstName,
            lastName,
            postcode,
            residentialAddress,
            cityFocused,
            firstNameFocused,
            lastNameFocused,
            postcodeFocused,
            residentialAddressFocused,
            countryOfBirth,
            nationality,
        } = this.state;
        const { success, lang } = this.props;

        const cityGroupClass = cr('pg-confirm__content-identity-col-row-content','pg-confirm__content-identity-col-row-list-content', 'pg-confirm__content-identity-col-row-list-content-fields', {
            'pg-confirm__content-identity-col-row-content--focused': cityFocused,
        });

        const firstNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': firstNameFocused,
        });

        const lastNameGroupClass = cr('pg-confirm__content-identity-col-row-content', {
            'pg-confirm__content-identity-col-row-content--focused': lastNameFocused,
        });

        const postcodeGroupClass = cr('pg-confirm__content-identity-col-row-content','pg-confirm__content-identity-col-row-list-content',  'pg-confirm__content-identity-col-row-list-content-fields', {
            'pg-confirm__content-identity-col-row-content--focused': postcodeFocused,
        });

        const residentialAddressGroupClass = cr('pg-confirm__content-identity-col-row-content','pg-confirm__content-identity-col-row-list-content',  'pg-confirm__content-identity-col-row-list-content-fields', {
            'pg-confirm__content-identity-col-row-content--focused': residentialAddressFocused,
        });

        const dataNationalities = nationalities.map(value => {
            return this.translate(value);
        });
        const dataMonths = months.map(value => {
            return this.translate(value);
        });
        const dataYears = Array.from({length: 2020 - 1900}, (v, k) => (k + 1900).toString()).reverse();
        const dataDays = this.fetchMonth();

        const onSelectNationality = value => this.selectNationality(dataNationalities[value]);
        const onSelectDay = value => this.selectDay(dataDays[value]);
        const onSelectMonth = value => this.selectMonth(dataMonths[value]);
        const onSelectYear = value => this.selectYear(dataYears[value]);

        /* tslint:disable */
        countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
        countries.registerLocale(require("i18n-iso-countries/langs/ru.json"));
        /* tslint:enable */

        const dataCountries = Object.values(countries.getNames(lang));
        const onSelectCountry = value => this.selectCountry(dataCountries[value]);

        return (
          <div className="pg-confirm__content-identity">
            <div className="pg-confirm__content-identity-forms">
                <div className="pg-confirm__content-identity-col">
                    <div className="pg-confirm__content-identity-col-row">
                        <div className="pg-confirm__content-identity-col-text">
                            <FormattedMessage id={'page.body.kyc.identity.firstName'}/>
                        </div>
                        <fieldset className={firstNameGroupClass}>
                            <input
                                className="pg-confirm__content-identity-col-row-content-number"
                                type="string"
                                placeholder={this.translate('page.body.kyc.identity.firstName')}
                                value={firstName}
                                onChange={this.handleChange('firstName')}
                                onFocus={this.handleFieldFocus('firstName')}
                                onBlur={this.handleFieldFocus('firstName')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <div className="pg-confirm__content-identity-col-text">
                            <FormattedMessage id={'page.body.kyc.identity.lastName'}/>
                        </div>
                        <fieldset className={lastNameGroupClass}>
                            <input
                                className="pg-confirm__content-identity-col-row-content-number"
                                type="string"
                                placeholder={this.translate('page.body.kyc.identity.lastName')}
                                value={lastName}
                                onChange={this.handleChange('lastName')}
                                onFocus={this.handleFieldFocus('lastName')}
                                onBlur={this.handleFieldFocus('lastName')}
                            />
                        </fieldset>
                    </div>
                    <div className="pg-confirm__content-identity-col-row">
                        <div className="pg-confirm__content-identity-col-dob-text">
                            <FormattedMessage id={'page.body.kyc.identity.dateOfBirth'}/>
                        </div>
                        <div className="pg-confirm__content-identity-col-row-content pg-confirm__content-identity-date-of-birth">
                            <div className="pg-confirm__content-identity-dropdown">
                                <Dropdown
                                    className="pg-confirm__content-documents-col-row-content-number"
                                    list={dataYears}
                                    onSelect={onSelectYear}
                                    placeholder={this.translate('page.body.kyc.identity.year')}
                                    contentUneditable={true}
                                />
                            </div>
                            <div className="pg-confirm__content-identity-dropdown">
                                <Dropdown
                                    className="pg-confirm__content-documents-col-row-content-number"
                                    list={dataMonths}
                                    onSelect={onSelectMonth}
                                    placeholder={this.translate('page.body.kyc.identity.month')}
                                    contentUneditable={true}
                                />
                            </div>
                            <div className="pg-confirm__content-identity-dropdown">
                                <Dropdown
                                    className="pg-confirm__content-documents-col-row-content-number"
                                    list={dataDays}
                                    onSelect={onSelectDay}
                                    placeholder={this.translate('page.body.kyc.identity.day')}
                                    contentUneditable={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pg-confirm__content-identity-col-row pg-confirm__content-identity-inputs">
                        <div className="pg-confirm__content-identity-col-row-content pg-confirm__content-identity-col-row-list-content">
                            <div className="pg-confirm__content-identity-col-text pg-confirm__content-identity-dropdown-text">
                                <FormattedMessage id={'page.body.kyc.identity.nationality'}/>
                            </div>
                            <Dropdown
                                className="pg-confirm__content-documents-col-row-content-number"
                                list={dataNationalities}
                                onSelect={onSelectNationality}
                                placeholder={this.translate('page.body.kyc.identity.nationality')}
                                contentUneditable={true}
                            />
                        </div>
                        <div className="pg-confirm__content-identity-col-row">
                            <div className="pg-confirm__content-identity-col-row-content pg-confirm__content-identity-col-row-list-content">
                                <div className="pg-confirm__content-identity-col-text pg-confirm__content-identity-dropdown-text">
                                    {this.translate('page.body.kyc.identity.CoR')}
                                </div>
                                <Dropdown
                                    className="pg-confirm__content-documents-col-row-content-number"
                                    list={dataCountries}
                                    onSelect={onSelectCountry}
                                    placeholder={this.translate('page.body.kyc.identity.CoR')}
                                    contentUneditable={true}
                                />
                            </div>
                        </div>
                        <div className="pg-confirm__content-identity-col-row pg-confirm__content-identity-fields pg-confirm__content-identity-positions">
                            <div className="pg-confirm__content-identity-col-text pg-confirm__content-identity-dropdown-text">
                                <FormattedMessage id={'page.body.kyc.identity.city'}/>
                            </div>
                            <fieldset className={cityGroupClass}>
                                <input
                                    className="pg-confirm__content-identity-col-row-content-number"
                                    type="string"
                                    placeholder={this.translate('page.body.kyc.identity.city')}
                                    value={city}
                                    onChange={this.handleChange('city')}
                                    onFocus={this.handleFieldFocus('city')}
                                    onBlur={this.handleFieldFocus('city')}
                                />
                            </fieldset>
                        </div>
                        <div className="pg-confirm__content-identity-col-row pg-confirm__content-identity-fields">
                            <div className="pg-confirm__content-identity-col-text pg-confirm__content-identity-dropdown-text">
                                <FormattedMessage id={'page.body.kyc.identity.residentialAddress'}/>
                            </div>
                            <fieldset className={residentialAddressGroupClass}>
                                <input
                                    className="pg-confirm__content-identity-col-row-content-number"
                                    type="string"
                                    placeholder={this.translate('page.body.kyc.identity.residentialAddress')}
                                    value={residentialAddress}
                                    onChange={this.handleChange('residentialAddress')}
                                    onFocus={this.handleFieldFocus('residentialAddress')}
                                    onBlur={this.handleFieldFocus('residentialAddress')}
                                />
                            </fieldset>
                        </div>
                        <div className="pg-confirm__content-identity-col-row pg-confirm__content-identity-fields">
                            <div className="pg-confirm__content-identity-col-text pg-confirm__content-identity-dropdown-text">
                                <FormattedMessage id={'page.body.kyc.identity.postcode'}/>
                            </div>
                            <fieldset className={postcodeGroupClass}>
                                <input
                                    className="pg-confirm__content-identity-col-row-content-number"
                                    type="string"
                                    placeholder={this.translate('page.body.kyc.identity.postcode')}
                                    value={postcode}
                                    onChange={this.handleChange('postcode')}
                                    onFocus={this.handleFieldFocus('postcode')}
                                    onBlur={this.handleFieldFocus('postcode')}
                                />
                            </fieldset>
                        </div>
                    </div>
                </div>
              </div>
              {success && <p className="pg-confirm__success">{success}</p>}
              <div className="pg-confirm__content-deep">
                  <Button
                      className="pg-confirm__content-phone-deep-button"
                      label={this.translate('page.body.kyc.next')}
                      onClick={this.sendData}
                      disabled={!firstName || !lastName  || !dayOfBirth || !yearOfBirth || !monthOfBirth || !nationality || !residentialAddress || !countryOfBirth || !city || !postcode}
                  />
              </div>
          </div>
        );
    }

    private handleFieldFocus = (field: string) => {
        return () => {
            switch (field) {
                case 'city':
                    this.setState({
                        cityFocused: !this.state.cityFocused,
                    });
                    break;
                case 'dateOfBirth':
                    this.setState({
                        dateOfBirthFocused: !this.state.dateOfBirthFocused,
                    });
                    break;
                case 'firstName':
                    this.setState({
                        firstNameFocused: !this.state.firstNameFocused,
                    });
                    break;
                case 'lastName':
                    this.setState({
                        lastNameFocused: !this.state.lastNameFocused,
                    });
                    break;
                case 'postcode':
                    this.setState({
                        postcodeFocused: !this.state.postcodeFocused,
                    });
                    break;
                case 'residentialAddress':
                    this.setState({
                        residentialAddressFocused: !this.state.residentialAddressFocused,
                    });
                    break;
                default:
                    break;
            }
        };
    }

    private fetchMonth() {
        const days = new Date(parseInt(this.state.yearOfBirth, 10), monthNameToNumber(this.state.monthOfBirth), 0).getDate() + 1;
        return Array.from({length: days - 1}, (v, k) => (k + 1).toString());
    }

    private handleChange = (key: string) => {
        return (e: OnChangeEvent) => {
            // @ts-ignore
            this.setState({
                [key]: e.target.value,
            });
        };
    };

    private selectNationality = (value: string) => {
        this.setState({
            nationality: value,
        });
    };

    private selectYear = (value: string) => {
        this.setState({
            yearOfBirth: value,
        });
    };

    private selectDay = (value: string) => {
        this.setState({
            dayOfBirth: value.length === 1 ? `0${value}` : value,
        });
    };

    private selectMonth = (value: string) => {
        this.setState({
            monthOfBirth: value,
        });
    };

    private selectCountry = (value: string) => {
        this.setState({
            countryOfBirth: countries.getAlpha2Code(value, this.props.lang),
        });
    };

    private sendData = () => {
        const date = `${this.state.dayOfBirth}/${monthNameToNumber(this.state.monthOfBirth)}/${this.state.yearOfBirth}`;
        const dob = !isDateInFuture(date) ? date : '';
        const profileInfo = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            dob,
            address: this.state.residentialAddress,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.countryOfBirth,
        };
        this.props.sendIdentity(profileInfo);
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    success: selectSendIdentitySuccess(state),
    lang: selectCurrentLanguage(state),
});

const mapDispatchProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        sendIdentity: payload => dispatch(sendIdentity(payload)),
        labelFetch: () => dispatch(labelFetch()),
    });

// tslint:disable-next-line
export const Identity = injectIntl(connect(mapStateToProps, mapDispatchProps)(IdentityComponent) as any);


// WEBPACK FOOTER //
// src/drone/src/src/custom/containers/Confirm/Identity/index.tsx
