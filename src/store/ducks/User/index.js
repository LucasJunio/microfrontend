import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  uploadDocuments,
  getDocumentsByUser,
  getUserById,
  putEditUser,
} from './service';

export const persistDocuments = createAsyncThunk(
  'user/persistDocuments',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await uploadDocuments(body, dispatch);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const documentsByUser = createAsyncThunk(
  'user/documentsByUser',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        signer: { token },
      } = getState();
      const payload = {
        id,
        token,
      };
      const { data } = await getDocumentsByUser(payload);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userById = createAsyncThunk(
  'user/userById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await getUserById(id);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await putEditUser(body);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  message: null,
  status: 'idle',
  percentUploadImg: 0,
  imgData: [],
  dataUser: {
    usuario: {
      nome: '',
      email: '',
      client_id: '',
      cliente_secret: '',
      base_64: '',
      status: '',
      numero_estabelecimento: '',
      terminal: '',
    },
    pessoa: {
      cpf: '',
      celular: '',
      nascimento: '',
      naturalidade: '',
      nacionalidade: '',
      estado_civil: '',
      rg: '',
      emissor: '',
      emissao: '',
      sexo: '',
      mae: '',
      pai: '',
    },
    empresa: {
      cnpj: '',
      cnae: 0,
      razao_social: '',
      telefone_fixo: '',
      celular: '',
      nome_fantasia: '',
      site: '',
    },
    conta: {
      banco: '',
      agencia: '',
      conta: '',
      operacao: '',
      pix: '',
    },
    endereco_cnpj: {
      cep: '',
      endereco: '',
      complemento: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    endereco_cpf: {
      cep: '',
      complemento: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
    },
    tarifa: {
      risco: '',
      periodo: '',
      observacao: '',
      segmento: '',
      tipo_cobranca: '',
      faturamento: '',
      tipo_cobranca: '',
    },
  },
  type: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    percentUploadImg: (state, action) => {
      return (state = { ...state, percentUploadImg: action.payload });
    },
    clearImgUpload: (state) => {
      return (state = { ...state, percentUploadImg: 0, imgData: [] });
    },
    clearPercentUpload: (state) => {
      return (state = { ...state, percentUploadImg: 0 });
    },
    clearUser: (state) => {
      return (state = {
        ...state,
        status: 'idle',
        message: '',
        type: '',
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(persistDocuments.pending, (state) => {
        return (state = { ...state, status: 'loading' });
      })
      .addCase(persistDocuments.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: 'completed',
          message: action.payload?.message,
        });
      })
      .addCase(persistDocuments.rejected, (state, action) => {
        return (state = {
          ...state,
          status: 'failed',
          message: action.payload?.message,
        });
      })
      .addCase(documentsByUser.pending, (state) => {
        return (state = { ...state, status: 'loading' });
      })
      .addCase(documentsByUser.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: 'completed',
          imgData: action.payload?.message,
        });
      })
      .addCase(documentsByUser.rejected, (state, action) => {
        return (state = {
          ...state,
          status: 'failed',
          imgData: action.payload?.message,
        });
      })
      .addCase(userById.pending, (state) => {
        return (state = { ...state, status: 'loading', type: 'userById' });
      })
      .addCase(userById.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: 'completed',
          dataUser: action.payload?.message,
          type: 'userById',
        });
      })
      .addCase(userById.rejected, (state, action) => {
        return (state = {
          ...state,
          status: 'failed',
          message: action.payload?.message,
          type: 'userById',
        });
      })
      .addCase(editUser.pending, (state) => {
        return (state = { ...state, status: 'loading', type: 'editUser' });
      })
      .addCase(editUser.fulfilled, (state, action) => {
        return (state = {
          ...state,
          status: 'completed',
          message: 'Atualizado com sucesso',
          type: 'editUser',
        });
      })
      .addCase(editUser.rejected, (state) => {
        return (state = {
          ...state,
          status: 'failed',
          message: 'Algo deu errado, tente novamente',
          type: 'editUser',
        });
      });
  },
});

export const {
  percentUploadImg,
  clearImgUpload,
  clearUser,
  clearPercentUpload,
} = user.actions;

export default user.reducer;
