/**
* @author Fabio Smeriglio
* @version $Id:$
*/
'use strict'
import { h, resolveComponent, shallowRef } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import Profile from './profile'
import {
  DateRender,
  StatusColumnField,
  MemberCharCounterRender,
} from '@/utils/formatColumns'
import MemberCharExpanded from "@/views/members/components/MemberCharExpanded.vue";
import adminImg from '@/assets/images/m-admin.png'
import redImg from '@/assets/images/m-red.png'
import purpleImg from '@/assets/images/m-purple.png'
import blueImg from '@/assets/images/m-blue.png'
import greenImg from '@/assets/images/m-green.png'
import whiteImg from '@/assets/images/m-white.png'

export default class Member {
  static getLayoutMembersList({ actions }) {
    return {
      columns: [
        {
          label: 'ID',
          field: 'ID',
          filter: {
            key: 'ID',
            type: 'input',
            onFilter: (value, record) => record.ID.includes(value)
          }
        },
        {
          label: 'Username',
          field: 'USERNAME',
          filter: {
            key: 'USERNAME',
            type: 'input',
            onFilter: (value, record) => record.USERNAME.toLowerCase().includes(value.toLowerCase())
          },
        },
        {
          label: 'Profilo',
          field: 'PLEVEL',
          align: 'center',
          filter: {
            key: 'PLEVEL',
            type: 'select',
            values: this.getProfileTags().map((p) => ({
              value: p.text,
              text: p.text
            })),
            onFilter: (value, record) => {
              const profile = this.getProfileTags().find((p) => p.text == value)
              return record.PLEVEL == profile.value
            }
          },
          renderComponent: ({ record }) => {
            const profile = this.getProfileTags().find((p) => p.value == record.text)
            return h(resolveComponent('a-tag'), { color: profile.color }, () => profile.text)
          }
        },
        {
          label: 'Discord',
          field: 'DISCORD_ID',
          filter: {
            key: 'discord_name',
            type: 'input',
            onFilter: (value, record) => record.username.toLowerCase().includes(value.toLowerCase())
          },
        },
        
        {
          label: 'Attivo',
          field: 'IS_ACTIVE',
          align: 'center',
          renderComponent: StatusColumnField()
        },
        {
          label: 'N° Personaggi',
          field: 'TOT_CHARS',
          align: 'center',
          renderComponent: MemberCharCounterRender()
        },
        {
          label: 'Data Creazione',
          field: 'CREATION_DATE',
          renderComponent: DateRender
        },
        {
          label: 'Ultima Modifica',
          field: 'UPDATE_DATE',
          renderComponent: DateRender
        }
      ],
      pagination: {
        enable: true,
        defaultCurrent: 1,
        defaultPageSize: 10,
        hideOnSinglePage: true,
        size: 'medium',
        showTotal: (total, range) => `${range[0]}-${[range[1]]} di ${total} elementi`
      },
      // expandable: {
      //   enable: true,
      //   rowExpandable: (record) => record.characters && record.characters.length > 0,
      //   expandedRowRender: shallowRef(MemberCharExpanded)
      // },
      actions: [
        {
          title: 'Vai al dettaglio',
          type: 'goToDetail',
          icon: SearchOutlined,
          run: actions['goToDetail']
        }
      ]
    }
  }

  static getLayoutMemberCharacterList() {
    return {
      columns: [
        {
          label: 'Nome PG',
          field: 'name',
          filter: {
            key: 'name',
            type: 'input',
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase())
          },
        },
        {
          label: 'In Gilda',
          field: 'in_guild',
          align: 'center',
          renderComponent: StatusColumnField()
        },
        {
          label: 'Gildato da',
          field: 'gilded_by',
          filter: {
            key: 'gilded_by',
            type: 'input',
            onFilter: (value, record) => record.gilded_by.toLowerCase().includes(value.toLowerCase())
          }
        },
        {
          label: 'Data Gildatura',
          field: 'date',
          renderComponent: DateRender
        },
      ],
      pagination: {
        enable: true,
        defaultCurrent: 1,
        defaultPageSize: 20,
        hideOnSinglePage: true,
        size: 'medium',
        showTotal: (total, range) => `${range[0]}-${[range[1]]} di ${total} elementi`
      },
    }
  }

  static getProfileTags = () => {
        return [
            { value: 5, text: 'Capo Gilda', color: 'gold', img: adminImg },
            { value: 4, text: 'Emissario', color: 'red', img: redImg},
            { value: 3, text: 'Console', color: 'purple', img: purpleImg},
            { value: 2, text: 'Veterano', color: 'blue', img: blueImg},
            { value: 1, text: 'Membro', color: 'green', img: greenImg},
            { value: 0, text: 'Ospite', color: '', img: whiteImg}
        ]
    }
}