'use strict'

import { curry, has, isNil, pipe, prop, join, isNotEmpty } from 'ramda'
import { h, ref, shallowRef } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/it' // Importa la localizzazione italiana
import { isFunction } from 'ramda-adjunct'
import { WarningOutlined } from '@ant-design/icons-vue'
import ActiveStatus from '@/components/ActiveStatus.vue'
import CollapseList from '@/components/CollapseList.vue'
import ObjectCollapseList from '@/components/ObjectCollapseList.vue'
import SecretField from '@/components/SecretField.vue'
// import IdLink from '@/components/IdLink.vue'
import PopoverList from '@/components/PopoverList.vue'
import PopoverListNoLink from '@/components/PopoverListNoLink.vue'
import PopoverListCustom from '@/components/PopoverListCustom.vue'
import HeaderExtraInfo from '@/components/tables/HeaderExtraInfo.vue'

import MemberCharCounter from '@/views/members/components/MemberCharCounter.vue'

// Abilita i plugin
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)
// Imposta la lingua italiana
dayjs.locale('it')

/**
 * FORMAT COLUMNS FOR ANT TABLE API
 */

export const createActionColumn = curry(function (layout, columns) {
  if (!isNil(layout.actions)) {
    columns.push({
      key: 'actions',
      width: `${40 * layout.actions.length}px`
    })
  }

  return columns
})

export const formatColumn = curry(function (layout) {
  const formattedColumns = layout.columns.map((col) => ({
    label: col.label,
    title: CustomColumnHeader(col),
    dataIndex: col.field,
    width: col.width || 'auto',
    key: col.field,
    align: col.align || 'left',
    ellipsis: col.ellipsis || false,
    showIf: col.showIf || true,
    disableIf: col.disableIf || false,
    customFilterDropdown: col.filter ? true : false,
    filterType: col.filter?.type || null
  }))

  return formattedColumns
})

export const addSortOption = curry(function (layout, columns) {
  return columns.map((col) => {
    const tableCol = layout.columns.find((c) => c.field === col.key)
    if (!isNil(tableCol.sort) && tableCol.sort.enabled) {
      col.sorter = tableCol.sort.pattern
        ? tableCol.sort.pattern
        : (a, b) => String(a[col.key]).localeCompare(String(b[col.key]))
    }

    return col
  })
})

export const setCustomRender = curry(function (layout, columns) {
  return columns.map((col) => {
    const tableCol = layout.columns.find((c) => c.field === col.key)
    if (tableCol && !isNil(tableCol.renderComponent)) {
      col.renderComponent = shallowRef(tableCol.renderComponent)
    } else if (tableCol && !isNil(tableCol.showIf)) {
      col.renderComponent = shallowRef(SpanWrap)
    }
    return col
  })
})

/**
 * MANAGE FILTER SECTION
 */

const getFilterValues = async (value) => {
  return isFunction(value) ? await value() : await Promise.resolve(value)
}

export const setFilterOperation = curry(async function (layout, columns) {
  return await Promise.all(
    columns.map(async (col) => {
      const tableCol = layout.columns.find((c) => c.field === col.key)
      if (tableCol && !isNil(tableCol.filter)) {
        const layoutFilter = tableCol.filter
        switch (layoutFilter.type) {
          case 'autocomplete':
            col.options = ref([])
            col.autocomplete = layoutFilter.autocomplete
            break
          case 'datetimepicker':
            col.format = tableCol.filter.format || 'MM-DD-YYYY HH:mm'
            break
          case 'radiobutton':
            col.filters = await getFilterValues(layoutFilter.values)
            col.filterMultiple = false
            break
          case 'select':
          case 'checkbox':
            col.filters = await getFilterValues(layoutFilter.values)
            break
          case 'date-range':
            col.startDate = tableCol.filter.startDate || col.key
            col.endDate = tableCol.filter.endDate || col.key
            col.format = tableCol.filter.format || 'MM-DD-YYYY HH:mm'
            break
        }

        if (!isNil(layoutFilter.onFilter)) {
          col.onFilter = layoutFilter.onFilter
        }
      }
      return col
    })
  )
})

export default (layout) =>
  pipe(
    formatColumn,
    addSortOption(layout),
    createActionColumn(layout),
    setCustomRender(layout),
    setFilterOperation(layout)
  )(layout)

/**
 * CUSTOM RENDER GENERIC TYPE
 */

export const SpanWrap = ({ record }) => h('span', {}, [record.text])

// Use it for format a date from server on type YYYY/MM/DD_HH:m:SS
export const DateRender = ({ record }) => {

  if (!record.text) {
    return h('span', {}, [
      h('span', {
        class: 'missing-data'
      }, '[missing]')
    ])
  }


  if (record.text === '[REDACTED]') {
    return h('span', {}, [
      h('span', {
        class: 'redacted-data'
      }, '[REDACTED]')
    ])
  }


  const localDate = dayjs(record.text)
    .tz('Europe/Rome')
    .format('D MMMM YYYY HH:mm')


  return h('span', {}, [localDate])
}

export const CamelCaseText = ({ record }) => {
  const text = record.text
    .replace('_', ' ')
    .split(' ')
    .map((t) => {
      return t[0].toUpperCase() + t.substring(1)
    })
    .join(' ')

  return h('span', {}, [text])
}
// Use it for use N/A for record that not have that field
export const NAIfEmpty = ({ record }) => h('span', {}, [record.text || 'N/A'])

export const WarningIfNil = ({ record }) => {
  let message = isNil(record.text)
    ? h(WarningOutlined, {
        style: { color: 'rgb(250, 185, 50)', fontSize: 'large' }
      })
    : record.text
  return h('span', {}, [message])
}

export const CustomColumnHeader =
  (col) =>
  ({ filters }) => {
    let filterSelected = ''
    let separator = ''
    let extraInfo = ''
    if (has(col.field, filters) && isNotEmpty(prop(col.field, filters))) {
      const filterValue = join(', ', prop(col.field, filters))
      filterSelected = h(
        'span',
        { class: 'header-filter-info', title: filterValue },
        [filterValue]
      )
      separator = ': '
    }

    if(col.extraInfo) {
      extraInfo = h(HeaderExtraInfo, { message: col.extraInfo }, () => [''])
    }

    return h('span', {}, [col.label, separator, filterSelected, extraInfo])
  }

export const ArrayAsListRender = ({ record }) => {
    const children = record.text.map((val) => h('li', {}, [val]))
    return h('ul', { className: 'colList' }, [...children])
}

export const ArrayObjectAsListRender = (mainField) => {
  return ({ record }) => {
    if(record.text){
      const children = record.text.map((obj) => h('li', {}, obj[mainField]))
      return h('ul', { className: 'colList' }, [...children])
    } else {
      return h("span", {}, "")
    }
  }
}

export const ArrayAsCollapseRender = ({ record }) => {
  return h(CollapseList, { record }, () => [''])
}

export const ArrayObjectAsCollapseRender = (mainField, details) => {
  return ({ record }) => {
    const items = record.text ? record.text.map((val) => ({
      mainField: val[mainField],
      details: details.map((field) => ({
        key: field.fieldLabel,
        value: val[field.fieldName],
        needSecret: field.needSecret || false,
        needLabel: field.needLabel || true,
        isArray: Array.isArray(val[field.fieldName])
      }))
    })) : {}

    return h(ObjectCollapseList, { items }, () => [''])
  }
}

export const SecretFieldRender = ({ record }) => {
  return h(SecretField, { realValue: record.text, inLine: false }, () => [''])
}

export const StatusColumnField = (type = 'lights', titles = undefined, inverted = false) => {
  return ({ record }) => {
    return h(
      ActiveStatus,
      {
        active: inverted ? !record.text : record.text,
        iconType: type,
        titles,
        align: 'center'
      },
      () => ['']
    )
  }
}

export const RuleFlowRender = ({ record }) => {
  return h(RuleFlow, { record }, () => [''])
}


export const IdLinkRender = (routeName, paramName, needIdClient = false) => {
  return ({ record }) => {
    return h(
      IdLink,
      {
        routeName: routeName,
        paramName: paramName,
        needIdClient: needIdClient,
        linkLabel: record.text
      },
      () => ['']
    )
  }
}

export const PopoverListRender = (
  title,
  mapName,
  routeName,
  paramName,
  needIdClient = false
) => {
  return ({ record }) => {
    return h(
      PopoverList,
      {
        record,
        title,
        mapName,
        routeName,
        paramName,
        needIdClient
      },
      () => ['']
    )
  }
}

export const PopoverListRenderNoLink = (title, fieldName) => {
  return ({ record }) => {
    return h(
      PopoverListNoLink,
      {
        record,
        title,
        elements: record.record[fieldName]
      },
      () => ['']
    )
  }
}

export const PopoverListRenderCustom = (title, fieldName) => {
  return ({ record }) => {

    return h(
      PopoverListCustom,
      {
        record,
        title,
        elements: record.record[fieldName],
      },
      () => ['']
    )

  }
}

export const WarningByStatusRender = (
  statusField,
  renderComponent = undefined,
  componentParams = {},
  needFn = true,
  object = undefined
) => {
  const fn = ({ record }) => {
    let render =
      record.record[statusField] == 'KO'
        ? h(WarningOutlined, {
            style: { color: 'rgb(250, 185, 50)', fontSize: 'large' },
            title: record.record['errorDescription']
          })
        : !isNil(renderComponent)
        ? h(renderComponent, { ...{ record }, ...componentParams }, () => [''])
        : h('span', {}, record.text)

    return render
  }

  return needFn ? fn : fn({ record: object })
}

export const RuleCriteriaRender = (rulesHook, appHook, contentHook) => {
  return ({ record }) => {
    switch (record.record.type) {
      case 'URLS': {
        const children = record.text['URLS'].map((val) => h('li', {}, [val]))
        return h('ul', { className: 'colList' }, [...children])
      }
      case 'PORT/PROTOCOL':
        return h('span', { style: 'padding-left: 16px' }, [
          record.text['PORT'] + ' / ' + record.text['PROTOCOL']
        ])
      case 'SERVICE':
        return h('span', { style: 'padding-left: 16px' }, [
          record.text[record.record.type]
        ])
      case 'CONTENT_ID':
      case 'APP_ID/APP_CAT_ID':
        return h(
          RuleCriteria,
          { record, rulesHook, appHook, contentHook },
          () => ['']
        )
    }
  }
}

export const MemberCharCounterRender = (options = undefined) => {
  return ({ record }) => {
    return h(
      MemberCharCounter,
      {record},
      () => ['']
    )
  }
}

export const GroupFixedIpsRender = () => {
  return ({ record }) => {
    return h(
      GroupFixedIps,
      {record},
      () => ['']
    )
  }
}

export const GroupCredentialsRender = () => {
  return ({ record }) => {
    return h(
      GroupCredentials,
      {record},
      () => ['']
    )
  }
}

export const ConnHistoryStatsRender = () => {
  return ({ record }) => {
    return h(
      ConnHistoryStats,
      {record},
      () => ['']
    )
  }
}

export const CellEditRender = ({ cellKey, type, values, save }) => {
  return ({ record }) => {
    return h(
      CellEdit,
      {
        record,
        text: record.record[cellKey],
        editing: record.record.editing || false,
        type,
        values,
        save,
        loading: record.record.loading || false
      },
      () => ['']
    )
  }
}